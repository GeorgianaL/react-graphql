import React from 'react';
import WithBox from '../withBox/withBoxHOC';

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const Filter = (props) => {
  console.log(props);
  return (
    <div className="select">
      <input
        value=""
        placeholder={capitalize(props.name)}
        onClick={props.boxIsOpen ? props.closeBox : props.openBox}
      />
      {
        props.boxIsOpen && (
          <div className="options">
            {
              props.options.map((option) => (
                <span
                  key={option.id}
                  className="option-item"
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
};

export default WithBox(Filter);
