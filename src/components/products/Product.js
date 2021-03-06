import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPropsName } from './queries';
import { propsById, productDetails } from '../../lib/productProps';
import { capitalize } from '../../lib/capitalize';

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
      <div className="product__content">
        <div className="product__photo">
          <img src={this.props.thumbnailUrl} alt="product" className="product__photo--thumbnailUrl" />
        </div>
        <div className="product__description">
          <div className="product__details">
            <div className="product__header">
              <div className="product__header--title">
                {
                  productDetails.title.map((detail) => (
                    <p key={`${this.props.id}-${detail}`}>{this.getPropValue(detail)}</p>
                  ))
                }
              </div>
              {
                productDetails.price.map((detail) => (
                  <div className="product__header--price" key={`${this.props.id}-${detail}`}><p>{this.props[detail]} €</p></div>
                ))
              }
            </div>
            <div className="product__body">
              {
                productDetails.details.map((detail) => {
                  if (propsById.includes(detail)) {
                    return (
                      <span key={`${detail}-value`}>{capitalize(detail)}: {this.getPropValue(detail)}</span>
                    );
                  } else {
                    return <span key={`${detail}-value`}>{capitalize(detail)}: {this.props[detail]}</span>
                  }
                })
              }
            </div>
          </div>
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

// {
//   allProductProps.map((property) => {
//     if (propsById.includes(property)) {
//       return (
//         <span key={`${property}-value`}>{capitalize(property)}: {this.getPropValue(property)}</span>
//       );
//     } else {
//       return <span key={`${property}-value`}>{capitalize(property)}: {this.props[property]}</span>
//     }
//   })
// }
