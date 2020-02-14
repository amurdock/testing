const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')

const graphql = new ApolloServer({ schema }).getMiddleware()

module.exports = express().use(graphql)
