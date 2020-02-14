const { Verifier } = require('@pact-foundation/pact')
const service = require('../service')

describe('subtract pact verification', () => {
  let server

  beforeAll(done => {
    server = service.listen(3400, done)
  })

  afterAll(done => {
    server.close(done)
  })

  it('validates the expectations of matching service', () => {
    return new Verifier({
      provider: 'subtract',
      logLevel: 'DEBUG',
      providerBaseUrl: 'http://localhost:3400',
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
