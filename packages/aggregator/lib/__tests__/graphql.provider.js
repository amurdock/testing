const { Verifier } = require('@pact-foundation/pact')
const service = require('../service')

describe('aggregator add pact verification', () => {
  let server

  beforeAll(done => {
    server = service.listen(4000, done)
  })

  afterAll(done => {
    server.close(done)
  })

  it('validates the expectations of matching service', () => {
    return new Verifier({
      provider: 'aggregator',
      logLevel: 'DEBUG',
      providerBaseUrl: 'http://localhost:4000/graphql',
      pactBrokerUrl: 'http://localhost:9292/',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    }).verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
