import React from 'react';
import PropTypes from 'prop-types';

import s from './Filter.module.css';

function Filter({ onChange, value }) {
  return (
    <>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={e => onChange(e)}
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
