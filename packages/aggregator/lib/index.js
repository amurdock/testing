const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema.js')

const port = process.env.PORT || 3000
const graphql = new ApolloServer({ schema }).getMiddleware()

express()
  .use(graphql)
  .listen(port, () =>
    console.log(`add service listening on port ${port}!`)
  )
