const path = require('path')
// add as a dev-proxy
const fileSystemAPI = require('./src/cms/file-system-api-plugin/fs-express-api');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@pages': './src/pages',
        },
        extensions: [
          'js',
        ],
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
        extensions: [".mdx", ".md"],
        // Imports here are available globally to .mdx files, with the exception
        // of automatically created pages located in /pages. This is a bug in
        // gatsby-mdx. See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
        //
        // Also note: For mdx to work in NetlifyCMS, global scope passed in here
        // also be passed into `cms.js`, under the `scope` key.
        //
        globalScope: `
          import Components from "../../../src/components";
          console.log('zzzz', Components);
          export default Components;
        `
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `model`,
        path: `${__dirname}/src/_content/model`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/_data`,
        name: 'data',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-default-mdx-basic',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`, // default: undefined
        stylesPath: `${__dirname}/src/cms/cms.css`, // default: undefined
        enableIdentityWidget: false, // default: true
        publicPath: 'admin',
        htmlTitle: 'Content Manager',
        manualInit: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
  developMiddleware: fileSystemAPI,
}
