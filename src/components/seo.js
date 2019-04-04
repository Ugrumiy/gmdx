import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = (props) => {
  const {
    description,
    lang,
    meta,
    keywords,
    title,
  } = props;
  return (
    <StaticQuery
      query={detailsQuery} //eslint-disable-line
      render={(data) => {
        const metaDescription = description || data.globalSiteSettingsYaml.siteMetadata.siteDescription;
        const metaTitle = title || data.globalSiteSettingsYaml.siteMetadata.sitetitle;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={metaTitle}
            titleTemplate={`%s | ${metaTitle}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: metaTitle,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.globalSiteSettingsYaml.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: metaTitle,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: 'keywords',
                    content: keywords.join(', '),
                  }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query {
    globalSiteSettingsYaml{
        siteMetadata{
        siteUrl
        siteTitle
        siteTitleShort
        siteDescription
        themeColor
        }
    }
  }
`;
