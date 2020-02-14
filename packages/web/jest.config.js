module.exports = {
  roots: ['./src'],
  rootDir: process.cwd(),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
}
