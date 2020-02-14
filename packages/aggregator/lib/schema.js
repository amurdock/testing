const { mergeSchemas } = require('graphql-tools')
const add = require('./add')
const divide = require('./divide')
const multiply = require('./multiply')
const subtract = require('./subtract')

module.exports = mergeSchemas({
  schemas: [add, divide, multiply, subtract],
})
