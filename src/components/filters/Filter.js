import React from 'react';

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const Filter = (props) => {
  return (
    <select className="select">
      <option value="" disabled selected hidden>{capitalize(props.name)}</option>
      <div className="options">
        {
          props.options.map(option => (<option key={option.id}>{option.type}</option>))
        }
      </div>
    </select>
  );
};

export default Filter;
