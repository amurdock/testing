import ApolloClient, { InMemoryCache } from 'apollo-boost'

export default fetch => new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
  fetch
})
