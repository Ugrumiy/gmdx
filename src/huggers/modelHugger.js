import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Layout from '@components/layout';

function PageTemplate({ data: { mdx } }) { // eslint-disable-line
  return (
    <Layout>
      <h1>MODEL</h1>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ModelQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;
export default PageTemplate;
