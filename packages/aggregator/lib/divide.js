const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

const resolution = (input, { host = 'divide', port = 3000 } = {}) =>
  fetch(`http://${host}:${port}`, {
    method: 'post',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())

const schema = makeExecutableSchema({
  typeDefs: gql`
    input DivideArgs {
      left: Int!
      right: Int!
    }
    
    type DivideResponse {
      result: Float!
    }
    
    type Query {
      divide(input: DivideArgs!): DivideResponse!
    }
  `,
  resolvers: {
    Query: {
      divide: (_, { input }) => resolution(input)
    },
  },
})

// exposed for consumer contract testing purposes
schema.resolution = resolution

module.exports = schema


