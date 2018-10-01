import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import menuIcon from '../../../public/menu.png';
import cancelIcon from '../../../public/cancel.svg';

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

    this.filtersNode = null;
    this.selectOption = this.selectOption.bind(this);
    this.deselectOption = this.deselectOption.bind(this);
    this.showFilters = this.showFilters.bind(this);
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

  showFilters() {
    if (this.filtersNode.style.display === 'none' || this.filtersNode.style.display === '') {
      this.filtersNode.style.display = 'block';
    } else {
      this.filtersNode.style.display = 'none';
    }
  }

  render() {
    const { filters } = this.props;
    if (filters.loading) {
      return (<h3>Loading filters...</h3>)
    } else {
      return (
        <div className="filters">
          <div className="filters__title" onClick={this.showFilters}>
            <img src={menuIcon} />
            <p>Filters</p>
          </div>
          <ul className="filters__list" ref={node => this.filtersNode = node}>
            {
              filters.filters.map((filter) => {
                return (
                  <li key={filter.id} className={isObject(this.state[filter.type]) ? "filter filter--selected" : "filter"}>
                    <Filter
                      name={filter.type}
                      options={this.getFilterOptions(filter.type)}
                      onSelectOption={(e) => this.selectOption(e)}
                      optionSelected={this.state[filter.type]}
                    />
                    {
                      isObject(this.state[filter.type]) &&
                        <img src={cancelIcon} className="filter__cancel" onClick={() => this.deselectOption(filter.type)} />
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
