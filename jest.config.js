module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.scss$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./setupTests.js'],
};
