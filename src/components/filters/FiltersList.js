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

import { isObject } from 'lodash';

import { allProductProps } from '../../lib/productProps';
import './filters.scss';

class FiltersList extends Component {
  constructor(...args) {
    super(...args);

    this.selectOption = this.selectOption.bind(this);
    this.deselectOption = this.deselectOption.bind(this);
  }

  componentDidMount() {
    const nextState = allProductProps.reduce((acc, item) => ({
      ...acc,
      [item]: '',
    }), {});

    this.setState(nextState);
  }

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
        if (isObject(this.state.brand)) {
          return models.models.filter(model => model.brandId === this.state.brand.id);
        }
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
  }

  setNewFilters() {
    const filters = Object.keys(this.state).reduce((acc, item) => {
      if (isObject(this.state[item])) {
        return {
          ...acc,
          [item]: this.state[item].id,
        };
      }
      return acc;
    }, {});
    this.props.updateFilters(filters);
  }

  selectOption(option) {
    this.setState({
      [option.__typename]: {
        id: option.id,
        type: option.type
      },
    }, () => {
      this.setNewFilters();
    });
  }

  deselectOption(option) {
    this.setState({
      [option]: "",
    }, () => {
      this.setNewFilters();
    });
  }

  render() {
    const { filters } = this.props;
    if (filters.loading) {
      return (<h3>Loading filters...</h3>)
    } else {
      return (
        <div className="filters">
          <h4 className="filters__title">Advanced search</h4>
          <ul className="filters__list">
            {
              filters.filters.map((filter) => {
                return (
                  <li key={filter.id} className="filter">
                    <Filter
                      name={filter.type}
                      options={this.getFilterOptions(filter.type)}
                      onSelectOption={(e) => this.selectOption(e)}
                      optionSelected={this.state[filter.type]}
                    />
                    {
                      isObject(this.state[filter.type]) &&
                        <span className="closeBox" onClick={() => this.deselectOption(filter.type)}>x</span>
                    }
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
