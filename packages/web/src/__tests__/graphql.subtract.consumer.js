import path from 'path'
import { Pact, GraphQLInteraction } from '@pact-foundation/pact'
import fetch from 'node-fetch'
import client from '../client'
import { calculatorQuery } from '../components/App'

describe('subtract consumer', () => {
  const provider = new Pact({
    port: 4000,
    log: path.resolve(process.cwd(), 'logs', 'mock.graphql.subtract.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'web',
    provider: 'aggregator',
  })

  const expected = {
    data: {
      subtract: {
        result: 1,
        __typename: 'SubtractResponse'
      },
    },
  }

  const variables = {
    left: 1,
    right: 1
  }

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())

  describe('when subtracting two integers', () => {
    beforeEach(() =>
      provider.addInteraction(
          new GraphQLInteraction()
            .uponReceiving('a subtraction request')
            .withQuery(`
              query Calculator($left: Int!, $right: Int!) {
                subtract(input: { left: $left, right: $right }) {
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
      const query = calculatorQuery('subtract')
      await expect(client(fetch).query({ query, variables })).resolves.toEqual(
        expect.objectContaining(expected)
      )
    })

    afterEach(() => provider.verify())
  })
})
