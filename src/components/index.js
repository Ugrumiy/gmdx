import Demo from './Demo';
import Demo2 from './Demo2';
import Gallery from './Gallery';

export const mdxpComponents = {}; // using this as in official docs breaks using <h1> <p> etc as html tags in mdx

export default {
  Demo,
  Demo2,
  Gallery,
  ...mdxpComponents,
};
