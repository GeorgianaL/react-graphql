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
  constructor(...args) {
    super(...args);

    this.state = {
      'filters': '',
    };

    this.updateFilters = this.updateFilters.bind(this);
  }

  updateFilters(newFilters) {
    this.setState({
      'filters': newFilters,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <FiltersList
            updateFilters={this.updateFilters}
          />
          <Products
            filters={this.state.filters}
          />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
