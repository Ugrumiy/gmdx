import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const Head = (props) => {
  const {
    themeColor,
  } = props;
  return (
    <Helmet>
      <meta content={themeColor} name="theme-color" />
      <meta content={themeColor} name="msapplication-TileColor" />
      <meta content={themeColor} name="msapplication-TileColor" />
    </Helmet>
  );
};

Head.propTypes = {

  themeColor: PropTypes.string,
};

const HeadWithQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        globalSiteSettingsYaml{
            siteMetadata{
            themeColor
            }
        }
      }
    `}
    render={data => <Head {...data.globalSiteSettingsYaml.siteMetadata} {...props} />}
  />
);

export default HeadWithQuery;
