const { Verifier } = require('@pact-foundation/pact')
const service = require('../service')

describe('add pact verification', () => {
  let server

  beforeAll(done => {
    server = service.listen(3100, done)
  })

  afterAll(done => {
    server.close(done)
  })

  it('validates the expectations of matching service', () => {
    return new Verifier({
      provider: 'add',
      logLevel: 'DEBUG',
      providerBaseUrl: 'http://localhost:3100',
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
