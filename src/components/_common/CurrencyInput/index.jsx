import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput = ({
  className = '',
  max = Number.MAX_SAFE_INTEGER,
  onChange,
  style = {},
  value,
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    // throw new Error(`invalid value property`);
  }

  const handleKeyDown = useCallback(
    (e) => {
      const { key, keyCode } = e;

      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }

      const valueString = value.toString();
      let nextValue;

      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString = value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
      }

      if (nextValue > max) {
        return;
      }

      onChange(nextValue);
    },
    [max, onChange, value],
  );

  const handleChange = useCallback(() => {
    // To avoid react warning
  }, []);

  const valueDisplay = (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <input
      className={`ant-input ${className || ''}`}
      inputMode="numeric"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={style}
      value={valueDisplay}
    />
  );
};

CurrencyInput.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.number,
};

export default CurrencyInput;
