const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              user
            }
          }
        }
      }
    }
  `);

  const caseTemplate = path.resolve('src/templates/case.jsx');

  pages.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: caseTemplate,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
