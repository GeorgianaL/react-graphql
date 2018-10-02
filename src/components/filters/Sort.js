import React from 'react';

import { capitalize } from '../../lib/capitalize';

import ascArrow from '../../../public/asc-arrow.png';
import descArrow from '../../../public/desc-arrow.png';

const Sort = (props) => (
  <div className="filters__sort">
    <p>Sort by {capitalize(props.by)}</p>
    <div className="filters__sort--icons">
      <img src={descArrow} alt="descendent-arrow" onClick={() => props.sortBy(props.by, 'desc')} />
      <img src={ascArrow} alt="ascendent-arrow" onClick={() => props.sortBy(props.by, 'asc')} />
    </div>
  </div>
);

export default Sort;
