import React from 'react';
import PropTypes from 'prop-types';
import ThemeWrapper from '@styling/ThemeWrapper';
import Header from './header';
import './layout.css';


const Layout = ({ children }) => (
  <ThemeWrapper>
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </ThemeWrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
