import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getProductsQuery } from './queries';

import Product from './Product.js';
import { variableProps } from '../../lib/productProps';
import './product.scss';

class Products extends Component {
  filterProducts(products) {
    const filters = this.props.filters;

    const availableProducts = products.filter((product) => {
      const filtersName = Object.keys(filters);

      let ok = true;
      filtersName.forEach((filter) => {
        if (variableProps.includes(filter)) {
          if (product[filter] > filters[filter]) {
            ok = false;
          }
        } else {
          if (product[filter] !== filters[filter]) {
            ok = false;
          }
        }
      });
      return ok;
    });
    console.log(availableProducts);
    return availableProducts;
  }

  displayProducts() {
      const { data } = this.props;
      if (data.loading) {
        return (<h3>Loading Products...</h3>)
      } else {
        const availableProducts = this.filterProducts(data.products);
        return availableProducts.map((product) => {
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
        <ul className="product__list">
          { this.displayProducts() }
        </ul>
      </div>
    );
  }
}

export default graphql(getProductsQuery)(Products);
