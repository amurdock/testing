const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

const resolution = (input, { host = 'add', port = 3000 } = {}) =>
  fetch(`http://${host}:${port}`, {
    method: 'post',
    body: JSON.stringify(input),
    headers: {'Content-Type': 'application/json'},
  }).then(response => response.json())

const schema = makeExecutableSchema({
  typeDefs: gql`
    input AddArgs {
      left: Int!
      right: Int!
    }
    
    type AddResponse {
      result: Int!
    }
    
    type Query {
      add(input: AddArgs!): AddResponse!
    }
  `,
  resolvers: {
    Query: {
      add: (_, { input }) => resolution(input)
    },
  },
})

// exposed for consumer contract testing purposes
schema.resolution = resolution

module.exports = schema
