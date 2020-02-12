const { Verifier } = require('@pact-foundation/pact')
const service = require('../service')

describe('multiply pact verification', () => {
  let server

  beforeAll(done => {
    server = service.listen(3000, done)
  })

  afterAll(done => {
    server.close(done)
  })

  it('validates the expectations of matching service', () => {
    return new Verifier({
      provider: 'multiply',
      logLevel: 'DEBUG',
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'http://localhost:9292/',
      consumerVersionTag: ['prod'],
      providerVersionTag: ['prod'],
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    }).verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
