const express = require('express')
const app = express()

module.exports = app
  .use(express.json())
  .post('/multiply', ({ body: { left, right } }, res) =>
    res.json({
      result: left * right
    })
  )
