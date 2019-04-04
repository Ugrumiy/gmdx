/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';

const Navbar = class extends React.Component {
  render() {
    const {
      mainNavConfig,
    } = this.props;
    return (
      <nav>
        { mainNavConfig.map(item => <Link to={`/${item.href}`}>{item.title}</Link>) }
      </nav>
    );
  }
};
Navbar.propTypes = {
  mainNavConfig: PropTypes.array,
};

export default () => (
  <StaticQuery
    query={graphql`{
      globalSiteSettingsYaml {
        mainNavConfig {
          title
          href
        }
      }
    }
  `}
    render={data => <Navbar {...data.globalSiteSettingsYaml} />}
  />
);
