const service = require('./service')
const port = process.env.PORT || 3000

service
  .listen(port, () =>
    console.log(`divide service listening on port ${port}!`)
  )
