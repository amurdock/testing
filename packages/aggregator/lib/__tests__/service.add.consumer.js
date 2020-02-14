const path = require('path')
const { Pact } = require('@pact-foundation/pact')
const { resolution } = require('../add')

describe('add consumer', () => {
  const provider = new Pact({
    consumer: 'aggregator',
    provider: 'add',
    port: 3000,
    log: path.resolve(process.cwd(), 'logs', 'pact.add.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
  })

  const expected = {
    result: 2
  }

  describe('when adding two integers', () => {
    beforeEach(() =>
      provider
        .setup()
        .then(() =>
          provider.addInteraction({
            uponReceiving: 'an addition for 1 and 2',
            withRequest: {
              method: 'POST',
              path: '/add',
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
