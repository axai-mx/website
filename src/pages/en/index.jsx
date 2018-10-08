import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import { Flex } from 'grid-emotion';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import GridItem from '../../components/GridItem';
import BeTheHero from '../../images/be_the_hero.svg';
import DataReport from '../../images/data_report.svg';
import MayTheForce from '../../images/may_the_force.svg';

const Header = styled.header`
  width: 100%;
  height: 600px;
  position: relative;
  padding: 1.75rem;
  @media (max-width: ${props => props.theme.breakpoint.s}) {
    height: 700px;
  }
`;

const Logo = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 1.75rem;
  margin-top: 50px;
`;

const Hero = styled(Flex)`
  height: 100%;
  text-align: center;
  background: url(/elias-gray.jpg);
  h1 {
    letter-spacing: 0.2rem;
    line-height: 4.5rem;
  }
  h3 {
    font-family: ${props => props.theme.fontFamily.body};
    margin-top: 2rem;
    font-size: 1.85rem;
    font-weight: 400;
  }
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    h1 {
      line-height: 3.5rem;
    }
    h3 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint.s}) {
    h1 {
      line-height: 2.5rem;
    }
    h3 {
      font-size: 1.3rem;
    }
  }
`;

const Wrapper = styled(Flex)`
  max-width: ${props => props.theme.maxWidth};
`;

const PrimaryBG = styled.section`
  background: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.textInvert};
  h1,
  h2,
  h3,
  h4 {
    color: ${props => props.theme.colors.textInvert};
  }
`;

const ServiceImage = styled.div`
  flex-basis: calc(99.9% * 4 / 7 - 5rem);
  max-width: calc(99.9% * 4 / 7 - 5rem);
  width: calc(99.9% * 4 / 7 - 5rem);
  text-align: center;
  img {
    width: 90%;
    margin-bottom: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoint.l}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    img {
      width: 50%;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint.s}) {
    img {
      width: 75%;
    }
  }
`;

const ServiceText = styled.div`
  flex-basis: calc(99.9% * 3 / 7 - 5rem);
  max-width: calc(99.9% * 3 / 7 - 5rem);
  width: calc(99.9% * 3 / 7 - 5rem);
  @media (max-width: ${props => props.theme.breakpoint.l}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
  }
  ol,
  ul {
    list-style: none;
    margin-left: 0;
  }
  li:before {
    content: '－';
    padding-right: 8px;
  }
`;

const Contact = styled(Wrapper)`
  margin: 0 auto;
  h1,
  h2,
  h3 {
    color: ${props => props.theme.colors.text};
  }
  h3 {
    font-family: ${props => props.theme.fontFamily.body};
    margin-top: 1rem;
    font-size: 1.85rem;
    font-weight: 400;
  }
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    font-size: 1.5rem;
  }
`;

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => (
  <Layout locale="en">
    <Header>
      <Logo>Axai</Logo>
      <Hero justifyContent="center" alignItems="center" flexDirection="column">
        <h1>The Drupal experts</h1>
        <h3>
          In Axai we like to develop mobile and web applications based on the Drupal platform, We will make sure those
          applications integrate seamlessly with existing or new systems.
          <br />
          <br />
          We specialize in system migration from other platforms to Drupal, and performance improvement of existing
          Drupal sites.
        </h3>
      </Hero>
    </Header>
    <Wrapper p={4} mb={[4, 4, 7]} mx="auto" justifyContent="space-between" flexWrap="wrap">
      {edges.map(c => (
        <GridItem
          uid={c.node.fields.slug}
          key={c.node.fields.slug}
          sizes={c.node.frontmatter.image.childImageSharp.sizes}
          alt={c.node.frontmatter.title}
          title={c.node.frontmatter.title}
          subtitle={c.node.frontmatter.type}
        />
      ))}
    </Wrapper>
    <PrimaryBG>
      <Wrapper flexDirection="column" p={4} mx="auto">
        <Flex w={1} py={5} justifyContent="space-between" flexWrap="wrap">
          <ServiceImage>
            <img src={BeTheHero} alt="Be The Hero" />
          </ServiceImage>
          <ServiceText>
            <h2>Discover Drupal</h2>
            <p>
              We develop websites and web applications using Drupal, THE Content Management System. We have the
              know-how, along with the know-what, know-why and know-who...
            </p>
            <ul>
              <li>Flexibility</li>
              <li>For small and big sites</li>
              <li>More than just a CMS, a Framework</li>
            </ul>
          </ServiceText>
        </Flex>
        <Flex w={1} py={5} justifyContent="space-between" flexDirection="row-reverse" flexWrap="wrap">
          <ServiceImage>
            <img src={DataReport} alt="Data Report" />
          </ServiceImage>
          <ServiceText>
            <h2>We've got it covered!</h2>
            <p>
              We <strong>develop</strong> like we mean it, we take it personal, you name it: we install, configure,
              develop and deploy Drupal, but we can also help you troubleshoot an existing site...
            </p>
            <ul>
              <li>Migrations</li>
              <li>Performance optimizations</li>
            </ul>
          </ServiceText>
        </Flex>
        <Flex w={1} py={5} justifyContent="space-between" flexWrap="wrap">
          <ServiceImage>
            <img src={MayTheForce} alt="May the Force" />
          </ServiceImage>
          <ServiceText>
            <h2>Also mobile apps</h2>
            <p>
              We have a solid portfolio of real customers and we have proven expertise for large and complex sites, but
              also for quick and simple ones. Want to know more? Give us a call, we can talk...
            </p>
            <ul>
              <li>Headless Drupal</li>
              <li>iOS & Android</li>
              <li>E-Commerce</li>
            </ul>
          </ServiceText>
        </Flex>
      </Wrapper>
    </PrimaryBG>
    <Contact px={4} py={6} justifyContent="center" alignItems="center" flexDirection="column">
      <h1>Say hi!</h1>
      <h3>info@axai.com.mx</h3>
    </Contact>
    <Footer translation="/" />
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
  query IndexEnQuery {
    caseStudies: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: "en" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            image {
              childImageSharp {
                sizes(maxWidth: 900, maxHeight: 900, quality: 90, traceSVG: { color: "#021212" }, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
            title
            type
          }
        }
      }
    }
  }
`;
