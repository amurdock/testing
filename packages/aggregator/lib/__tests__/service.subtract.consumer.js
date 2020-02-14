const path = require('path')
const { Pact } = require('@pact-foundation/pact')
const { resolution } = require('../subtract')

describe('subtract consumer', () => {
  const provider = new Pact({
    consumer: 'aggregator',
    provider: 'subtract',
    port: 3000,
    log: path.resolve(process.cwd(), 'logs', 'pact.subtract.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
  })

  const expected = {
    result: 0
  }

  describe('when subtracting two integers', () => {
    beforeEach(() =>
      provider
        .setup()
        .then(() =>
          provider.addInteraction({
            uponReceiving: 'subtracting 1 from 2',
            withRequest: {
              method: 'POST',
              path: '/subtract',
              headers: { 'Content-Type': 'application/json' },
              body: {
                left: 1,
                right: 1
              }
            },
            willRespondWith: {
              status: 200,
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
              body: expected,
            },
          })
        )
    )

    it('returns the expected result', async () => {
      await expect(resolution({ left: 1, right: 1 }))
        .resolves.toEqual(expected)
    })

    afterEach(() => provider.verify())
  })

  afterAll(() => provider.finalize())
})
