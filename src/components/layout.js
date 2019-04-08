import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import ThemeWrapper from '@styling/ThemeWrapper';
import Header from './header';
import './layout.css';
import Components from './index.js';

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
      <MDXProvider components={Components}>{children}</MDXProvider>
    </div>
  </ThemeWrapper>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
