import React from 'react';
import logoSvg from '../../assets/image/Logo.png';

import './styles.scss';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoSvg} alt="Logo" />
    </div>
  );
};

export default Logo;
