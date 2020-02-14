import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import App from './components/App'

//Apollo Client
ReactDOM.render(
  <ApolloProvider client={client()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
