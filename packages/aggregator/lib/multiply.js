const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

module.exports = makeExecutableSchema({
  typeDefs: gql`
    input MultiplyArgs {
      left: Int!
      right: Int!
    }
    
    type MultiplyResponse {
      result: Int!
    }
    
    type Query {
      multiply(input: MultiplyArgs!): MultiplyResponse!
    }
  `,
  resolvers: {
    Query: {
      multiply: (source, { input }) =>
        fetch('http://docker.for.mac.localhost:3300', {
          method: 'post',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
    },
  },
})
