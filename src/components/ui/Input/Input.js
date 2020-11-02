import React from 'react';

import classes from './Input.css';

const Input = (props) => {
  const inputType = props.type || 'text';
  const clss = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  // if (true) {
  //   clss.push(classes.invalid);
  // }
  return (
    <div className={clss.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
};

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export default Input;
