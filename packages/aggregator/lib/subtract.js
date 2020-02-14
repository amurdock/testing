const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

const resolution = (input, host = process.env.SUBTRACT_HOST || 'localhost:3000') =>
  fetch(`http://${host}/subtract`, {
    method: 'post',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())

const schema = makeExecutableSchema({
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
      subtract: (_, {input}) => resolution(input)
    },
  },
})

// exposed for consumer contract testing purposes
schema.resolution = resolution

module.exports = schema
