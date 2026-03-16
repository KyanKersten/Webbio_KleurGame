import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const MAX_PAGES = 50;

async function discoverInternalRoutes(page: Page) {
  const visited = new Set<string>();
  const queue = ['/'];

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const route = queue.shift()!;
    if (visited.has(route)) continue;

    visited.add(route);
    await page.goto(route);

    const discoveredRoutes = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));

      return links
        .map((link) => link.getAttribute('href') ?? '')
        .filter((href) => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:'));
    });

    for (const href of discoveredRoutes) {
      const next = new URL(href, page.url());
      const current = new URL(page.url());
      if (next.origin !== current.origin) continue;

      const normalized = `${next.pathname}${next.search}`;
      if (!visited.has(normalized) && !queue.includes(normalized)) {
        queue.push(normalized);
      }
    }
  }

  return [...visited];
}

test('should not have WCAG 2.1 A/AA violations on discovered pages', async ({ page }) => {
  const routes = await discoverInternalRoutes(page);

  for (const route of routes) {
    await page.goto(route);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations, `Accessibility violations found on route: ${route}`).toEqual([]);
  }
});
