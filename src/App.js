import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import Products from './components/products/Products.js';
import FiltersList from './components/filters/FiltersList';

import './index.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <FiltersList />
          <Products />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
