export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/src/tests/index.spec.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};
