import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import Image from 'gatsby-image';
import { Box } from 'grid-emotion';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import config from '../../config/website';

const Hero = styled.section`
  width: 100%;
`;

const Wrapper = styled(Box)`
  max-width: ${props => props.theme.maxWidth};
`;

const TitleWrapper = styled(Box)`
  width: 100%;
  background: ${props => props.theme.colors.bg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  max-width: ${props => props.theme.maxWidthText};
  text-align: center;
  margin: 0 auto;
  padding: 0 32px;
`;

const SubTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  max-width: ${props => props.theme.maxWidthText};
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.main`
  margin-top: 9rem;
  margin-bottom: 9rem;
  p {
    text-align: justify;
  }
  p,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  blockquote {
    max-width: ${props => props.theme.maxWidthText};
    margin-left: auto;
    margin-right: auto;
  }
  li {
    margin-left: 1.45rem;
  }
  .block-img {
    max-width: 100%;
    margin-top: 6rem;
    margin-bottom: 6rem;
    text-align: center;
  }
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    margin-top: 6rem;
    margin-bottom: 6rem;
    .block-img {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
  }
`;

const CaseTemplate = ({ data: { markdownRemark: caseNode } }) => (
  <Layout locale={caseNode.frontmatter.lang}>
    <Helmet title={`${caseNode.frontmatter.title} | ${config.siteTitle}`} />
    <SEO caseNode={caseNode} casePath={caseNode.fields.slug} caseSEO />
    <Hero>
      {caseNode.frontmatter.image ? <Image sizes={caseNode.frontmatter.image.childImageSharp.sizes} /> : null}
      <TitleWrapper py={4}>
        <Title>{caseNode.frontmatter.title}</Title>
      </TitleWrapper>
    </Hero>
    <Wrapper py={4} px={4} mx="auto">
      <SubTitle>
        {caseNode.frontmatter.user} {caseNode.frontmatter.date}
      </SubTitle>
      <Content dangerouslySetInnerHTML={{ __html: caseNode.html }} />
    </Wrapper>
    <Footer isCase locale={caseNode.frontmatter.lang} translation={caseNode.frontmatter.translation} />
  </Layout>
);

export default CaseTemplate;

CaseTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        lang
        translation
        image {
          childImageSharp {
            sizes(maxWidth: 1920, quality: 90, traceSVG: { color: "#021212" }) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
            resize(width: 800) {
              src
            }
          }
        }
        title
        date(formatString: "DD/MMMM/YYYY")
        user
      }
    }
  }
`;
