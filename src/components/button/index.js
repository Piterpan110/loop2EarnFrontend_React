import React from 'react';

const Button = ({ type, label, onClick, a_class }) => {
  return (
    <button type={'submit'} className={a_class} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
