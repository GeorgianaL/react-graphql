import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import Users from './components/Users.js';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>React-GraphQL Project</h1>
          <Users />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
