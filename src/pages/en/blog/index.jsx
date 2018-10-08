import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import { Flex } from 'grid-emotion';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import BlogItem from '../../../components/BlogItem';

const Wrapper = styled(Flex)`
  max-width: ${props => props.theme.maxWidth};
`;

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => (
  <Layout locale="en">
    <h1>Blog</h1>
    <Wrapper p={4} mb={[4, 4, 7]} mx="auto" justifyContent="space-between" flexWrap="wrap">
      {edges.map(c => (
        <BlogItem
          uid={c.node.fields.slug}
          key={c.node.fields.slug}
          title={c.node.frontmatter.title}
          excerpt={c.node.excerpt}
          user={c.node.frontmatter.user}
        />
      ))}
    </Wrapper>
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            user
          }
        }
      }
    }
  }
`;
