import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => (
  <Layout locale="en">
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '35rem',
        padding: '2rem 1rem',
      }}
    >
      <h1>Blog</h1>
      <div>
        {edges.map(c => (
          <div key={c.node.fields.slug}>
            <Link to={c.node.fields.slug}>
              <h3 style={{ marginBottom: '0rem' }}>{c.node.frontmatter.title}</h3>
            </Link>
            <p>
              {c.node.frontmatter.date} por {c.node.frontmatter.user}
            </p>
          </div>
        ))}
      </div>
    </div>
    <Footer locale="en" translation="/es/blog" />
  </Layout>
);

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    caseStudies: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogEnQuery {
    caseStudies: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog.en/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD/MMMM/YYYY")
            user
          }
        }
      }
    }
  }
`;
