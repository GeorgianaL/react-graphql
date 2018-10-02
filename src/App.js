import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { isEqual } from 'lodash';

// components
import Header from './components/header/Header.js';
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
      'sorts': '',
    };

    this.updateFilters = this.updateFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  updateFilters(newFilters) {
    this.setState({
      'filters': newFilters,
    });
  }

  updateSort(sortElem, sortOrder) {
    const newSort = {
      [sortElem] : sortOrder,
    };

    this.setState({
      'sorts': isEqual(newSort, this.state.sorts) ? '' : newSort,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <div className="main">
          <FiltersList
            updateFilters={this.updateFilters}
            updateSort={this.updateSort}
          />
          <Products
            filters={this.state.filters}
            sorts={this.state.sorts}
          />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
