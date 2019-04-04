// src/components/posts-page-layout.js
import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <h1>DEFAULT</h1>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
      <h4>eqweqwe</h4>
    </div>
  );
}
export const pageQuery = graphql`
  query DefaultQuery($id: String) {
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
export default PageTemplate
