const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

module.exports = makeExecutableSchema({
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
      divide: (source, { input }) =>
        fetch('http://docker.for.mac.localhost:3200', {
          method: 'post',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
    },
  },
})
