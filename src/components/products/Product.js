import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPropsName } from './queries';
import { allProductProps, propsById } from '../../lib/productProps';

class Product extends Component {
  getPropValue(prop) {
    const { data } = this.props;

    if (!data.loading) {
      switch (prop) {
        case 'brand':
          return data.getBrand.type;
        case 'model':
          return data.getModel.type;
        case 'engine':
          return data.getEngineType.type;
        case 'fuels':
          return data.getFuelType.type;
        case 'gearbox':
          return data.getGearbox.type;
        case 'color':
          return data.getColor.type;
        default:
          return 'Not specified';
      }
    }
  }

  render() {
    return (
      <div className="product-content">
        <div className="product-photo">
          <img src={this.props.thumbnailUrl} alt="product" className="thumbnailUrl" />
        </div>
        <div className="product-description">
          <ul className="product-details">
            {
              allProductProps.map((property) => {
                if (propsById.includes(property)) {
                  return (
                    <li key={`${property}-value`}>{property}: {this.getPropValue(property)}</li>
                  );
                } else {
                  return <li key={`${property}-value`}>{property}: {this.props[property]}</li>
                }
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default graphql(getPropsName, {
    options: (props) => {
      return {
        variables: {
          brandId: props.brand,
          modelId: props.model,
          fuelTypeId: props.fuel,
          engineTypeId: props.engine,
          gearboxId: props.gearbox,
          colorId: props.color
        }
      }
    }
})(Product);
