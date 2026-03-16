import { test, expect } from '@playwright/test';
import AxeBuilder from "@axe-core/playwright"


test('should not have any automatically detectable WCAG 2.1 A/AA violations', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

