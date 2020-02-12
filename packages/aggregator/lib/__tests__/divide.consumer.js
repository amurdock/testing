const path = require('path')
const { Pact } = require('@pact-foundation/pact')
const { resolution } = require('../divide')

describe('divide consumer', () => {
  const provider = new Pact({
    consumer: 'aggregator',
    provider: 'divide',
    port: 3000,
    log: path.resolve(process.cwd(), 'logs', 'pact.divide.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
  })

  const expected = {
    result: 0.5
  }

  describe('when dividing two integers', () => {
    beforeEach(() =>
      provider
        .setup()
        .then(() =>
          provider.addInteraction({
            uponReceiving: 'a division of 1 by 2',
            withRequest: {
              method: 'POST',
              path: '/',
              headers: { 'Content-Type': 'application/json' },
              body: {
                left: 1,
                right: 2
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
      await expect(resolution({ left: 1, right: 2 }, { host: 'localhost' }))
        .resolves.toEqual(expected)
    })

    afterEach(() => provider.verify())
  })

  afterAll(() => provider.finalize())
})
