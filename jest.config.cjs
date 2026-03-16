module.exports = {
  // Use the ts-jest ESM preset so Jest can handle TypeScript + ESM
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  // Helpful for certain import resolution edge-cases when TS emits .js in imports
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
