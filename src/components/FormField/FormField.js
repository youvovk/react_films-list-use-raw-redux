import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './FormField.scss';

export const FormField = memo((props) => {
  const {
    error,
    name,
    label,
    type,
    onChange,
    placeholder,
    value,
  } = props;

  const inputClass = cx('input', { 'is-danger': !!error });
  const controlClass = cx('control', { 'has-icons-right': !!error });

  const Control = type === 'textarea' ? type : 'input';

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className={controlClass}>
        <Control
          name={name}
          id={name}
          className={inputClass}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {error && (
        <p className="help is-danger">{error}</p>
      )}
    </div>
  );
});

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

FormField.defaultProps = {
  error: '',
  type: 'text',
  placeholder: 'Type text here',
};
