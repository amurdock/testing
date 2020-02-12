const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

module.exports = makeExecutableSchema({
  typeDefs: gql`
    input SubtractArgs {
      left: Int!
      right: Int!
    }
    
    type SubtractResponse {
      result: Int!
    }
    
    type Query {
      subtract(input: SubtractArgs!): SubtractResponse!
    }
  `,
  resolvers: {
    Query: {
      subtract: (source, { input }) =>
        fetch('http://docker.for.mac.localhost:3400', {
          method: 'post',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
    },
  },
})
