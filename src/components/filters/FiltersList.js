import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import Filter from './Filter';
import {
  getFiltersQuery,
  getBrandsQuery,
  getModelsQuery,
  getFuelTypesQuery,
  getEngineTypesQuery,
  getGearboxesQuery,
  getColorsQuery,
} from './queries';

import './filters.css';

class FiltersList extends Component {
  getFilterOptions(filterId) {
    const {
      brands,
      models,
      fuelTypes,
      engineTypes,
      gearboxes,
      colors,
    } = this.props;

    switch (filterId) {
      case 'brand':
        return brands.brands;
      case 'model':
        return models.models;
      case 'fuel':
        return fuelTypes.fuelTypes;
      case 'engine':
        return engineTypes.engineTypes;
      case 'gearbox':
        return gearboxes.gearboxes;
      case 'color':
        return colors.colors;
      default:
        return [];
    }
  };

  render() {
    const { filters } = this.props;
    if (filters.loading) {
      return (<h3>Loading filters...</h3>)
    } else {
      return (
        <div className="filters">
          <h4 className="filters-title">Advanced search</h4>
          <ul className="filters-list">
            {
              filters.filters.map((filter) => {
                return (
                  <li key={filter.id} className="filter">
                    <Filter
                      name={filter.type}
                      options={this.getFilterOptions(filter.type)}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
  }
}

export default compose(
  graphql(getFiltersQuery, {name: 'filters'}),
  graphql(getBrandsQuery, {name: 'brands'}),
  graphql(getModelsQuery, {name: 'models'}),
  graphql(getFuelTypesQuery, {name: 'fuelTypes'}),
  graphql(getEngineTypesQuery, {name: 'engineTypes'}),
  graphql(getGearboxesQuery, { name: 'gearboxes'}),
  graphql(getColorsQuery, { name: 'colors'})
)(FiltersList);
