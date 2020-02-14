const port = process.env.PORT || 3000

require('./service').listen(port, () =>
  console.log(`aggregator service listening on port ${port}!`)
)
