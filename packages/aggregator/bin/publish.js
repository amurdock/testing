const pact = require('@pact-foundation/pact-node')
const path = require('path')

pact
  .publishPacts({
    pactFilesOrDirs: [
      path.resolve(__dirname, '../pacts'),
    ],
    pactBroker: 'http://localhost:9292',
    tags: ['prod'],
    consumerVersion:
      `1.0.${Math.floor(new Date() / 1000)}`,
  })
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to https://localhost:9292/')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })
