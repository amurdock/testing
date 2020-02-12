const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app
  .use(express.json())
  .post('/', ({ body: { left, right } }, res) => res.json({
    result: left * right
  }))
  .listen(port, () =>
    console.log(`multiply service listening on port ${port}!`)
  )
