import React, { Component } from 'react';
import WithBox from '../withBox/withBoxHOC';

import { isObject } from 'lodash';
import { capitalize } from '../../lib/capitalize';


class Filter extends Component {
  render() {
    const { name, options } = this.props;
    const optionSelected = isObject(this.props.optionSelected) ? this.props.optionSelected.type : "";

    return (
      <div className="filter__input">
        <div
          onClick={this.props.boxIsOpen ? this.props.closeBox : this.props.openBox}
          className={optionSelected === "" ? "filter__input--empty" : "filter__input--selection"}
        >
          <span className="filter__input--value">{optionSelected === "" ? capitalize(name) : optionSelected}</span>
        </div>
        {
          this.props.boxIsOpen && (
            <div className="options">
              {
                options.map((option) => (
                  <span
                    key={option.id}
                    className="options__item"
                    onClick={() => this.props.onSelectOption(option)}
                  >
                    {option.type}
                  </span>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default WithBox(Filter);
