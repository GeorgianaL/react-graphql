import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import menuIcon from '../../../public/menu.png';
import sortIcon from '../../../public/order.png';
import cancelIcon from '../../../public/cancel.svg';

import Filter from './Filter';
import Sort from './Sort';
import {
  getFiltersQuery,
  getBrandsQuery,
  getModelsQuery,
  getFuelTypesQuery,
  getEngineTypesQuery,
  getGearboxesQuery,
  getColorsQuery,
  getPricesQuery,
  getKmQuery,
  getYearQuery,
} from './queries';

import { isObject } from 'lodash';

import { allProductProps, variableProps } from '../../lib/productProps';
import { getThresholds, mapIDs } from '../../lib/utils';

import './filters.scss';

class FiltersList extends Component {
  constructor(...args) {
    super(...args);

    this.filtersNode = null;
    this.sortsNode = null;
    this.selectOption = this.selectOption.bind(this);
    this.deselectOption = this.deselectOption.bind(this);
    this.showFilters = this.showFilters.bind(this);
    this.showSorts = this.showSorts.bind(this);
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
      prices,
      km,
      year,
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
      case 'price':
        const priceValues = getThresholds(prices.products.map(product => product.price));
        return mapIDs(priceValues, 'price');
      case 'km':
        const kmValues = getThresholds(km.products.map(product => product.km));
        return mapIDs(kmValues, 'km');
      case 'year':
        const yearValues = getThresholds(year.products.map(product => product.year));
        return mapIDs(yearValues, 'year');
      default:
        return [];
    }
  }

  setNewFilters() {
    const filters = Object.keys(this.state).reduce((acc, item) => {
      if (isObject(this.state[item])) {
        let value = '';
        if (variableProps.includes(item)) {
          value = this.state[item].type;
        } else {
          value = this.state[item].id;
        }
        return {
          ...acc,
          [item]: value,
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

  showSorts() {
    if (this.sortsNode.style.display === 'none' || this.sortsNode.style.display === '') {
      this.sortsNode.style.display = 'block';
    } else {
      this.sortsNode.style.display = 'none';
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
            <img src={menuIcon} alt="menu-icon" />
            <p>Filters</p>
          </div>
          <div className="filters__title" onClick={this.showSorts}>
            <img src={sortIcon} alt="sort-icon" />
            <p>Sort</p>
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
                        <img src={cancelIcon} className="filter__cancel" onClick={() => this.deselectOption(filter.type)}  alt="cancel-filter" />
                    }
                  </li>
                );
              })
            }
          </ul>
          <ul  className="filters__list" ref={node => this.sortsNode = node}>
            {
              variableProps.map((sortType) => (
                <li key={`${sortType}-sort`}>
                  <Sort by={sortType} sortBy={this.props.updateSort} />
                </li>
              ))
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
  graphql(getColorsQuery, { name: 'colors'}),
  graphql(getPricesQuery, { name: 'prices'}),
  graphql(getKmQuery, { name: 'km'}),
  graphql(getYearQuery, { name: 'year'})
)(FiltersList);
