const service = require('./service')
const port = process.env.PORT || 3000

service
  .listen(port, () =>
    console.log(`multiply service listening on port ${port}!`)
  )
