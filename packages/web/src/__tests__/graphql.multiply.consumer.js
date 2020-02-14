import path from 'path'
import { Pact, GraphQLInteraction } from '@pact-foundation/pact'
import fetch from 'node-fetch'
import client from '../client'
import { calculatorQuery } from '../components/App'

describe('multiply consumer', () => {
  const provider = new Pact({
    port: 4000,
    log: path.resolve(process.cwd(), 'logs', 'mock.graphql.multiply.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'web',
    provider: 'aggregator',
  })

  const expected = {
    data: {
      multiply: {
        result: 1,
        __typename: 'MultiplyResponse'
      },
    },
  }

  const variables = {
    left: 1,
    right: 1
  }

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())

  describe('when multiplying two integers', () => {
    beforeEach(() =>
      provider.addInteraction(
          new GraphQLInteraction()
            .uponReceiving('a multiplication request')
            .withQuery(`
              query Calculator($left: Int!, $right: Int!) {
                multiply(input: { left: $left, right: $right }) {
                  result
                  __typename
                }
              }`)
            .withOperation('Calculator')
            .withRequest({
              path: '/graphql',
              method: 'POST',
            })
            .withVariables(variables)
            .willRespondWith({
              status: 200,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: expected,
            })
        )
    )

    it('returns the expected result', async () => {
      const query = calculatorQuery('multiply')
      await expect(client(fetch).query({ query, variables })).resolves.toEqual(
        expect.objectContaining(expected)
      )
    })

    afterEach(() => provider.verify())
  })
})
