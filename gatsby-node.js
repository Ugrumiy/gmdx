
const path = require("path");

// to recreate subfolder abilities
const getSlugFromTitle = (node) => {
  const splitPath = node.fileAbsolutePath.split(path.sep);
  let parentFolderName = splitPath[splitPath.length -2];
  parentFolderName = parentFolderName === '_content' ? '' : parentFolderName;
  if (node.frontmatter.title === 'index') return '/';
  return `${parentFolderName}/${node.frontmatter.title.replace('--', '/')}`;
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const finalPath =
      node.frontmatter.forceLocation != null && node.frontmatter.forceLocation !== '' ?
      `/${node.frontmatter.forceLocation}` :
        getSlugFromTitle(node);
      // const path = slugFromTitle(node.frontmatter.title);
    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix
      value: finalPath
    });
  }
};
exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  frontmatter{
                    huggerTemplate
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }
        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/huggers/${String(node.frontmatter.huggerTemplate)}Hugger.js`),
            // We can use the values in this context in
            // our page layout component
            context: { id: node.id }
          });
        });
      })
    );
  });
};
