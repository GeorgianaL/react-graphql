import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getProductsQuery } from './queries';

import Product from './Product.js';
import './product.css';

class Products extends Component {
  displayProducts() {
      const { data } = this.props;
      if (data.loading) {
        return (<h3>Loading Products...</h3>)
      } else {
        return data.products.map((product) => {
          return (
            <li key={product.id}  className="product">
              <Product {...product} />
            </li>
          );
        })
      }
  }

  render() {
    return (
      <div>
        <ul className="products-list">
          { this.displayProducts() }
        </ul>
      </div>
    );
  }
}

export default graphql(getProductsQuery)(Products);
