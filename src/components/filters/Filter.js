import React, { Component } from 'react';
import WithBox from '../withBox/withBoxHOC';

import { isObject } from 'lodash';
import { capitalize } from '../../lib/capitalize';


class Filter extends Component {
  render() {
    const { name, options } = this.props;
    const optionSelected = isObject(this.props.optionSelected) ? this.props.optionSelected.type : "";

    return (
      <div className="filter-input">
        <div
          onClick={this.props.boxIsOpen ? this.props.closeBox : this.props.openBox}
          className={optionSelected === "" ? "input empty" : "input selection"}
        >
          <span className="value">{optionSelected === "" ? capitalize(name) : optionSelected}</span>
        </div>
        {
          this.props.boxIsOpen && (
            <div className="options">
              {
                options.map((option) => (
                  <span
                    key={option.id}
                    className="option-item"
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
