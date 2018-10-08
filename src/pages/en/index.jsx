import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import { Flex } from 'grid-emotion';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import ProjectListing from '../../components/ProjectListing';
import BeTheHero from '../../images/be_the_hero.svg';
import DataReport from '../../images/data_report.svg';
import MayTheForce from '../../images/may_the_force.svg';

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
    <header>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <img src="/axai.png" alt="axai" />
        <h1>Axai, the Drupal experts</h1>
        <big>
          <center>
            In Axai we like to develop mobile and web applications based on the Drupal platform, We will make sure those
            applications integrate seamlessly with existing or new systems.
          </center>
          <br />
          <center>
            We specialize in system migration from other platforms to Drupal, and performance improvement of existing
            Drupal sites.
          </center>
        </big>
      </Flex>
    </header>
    <ProjectListing nodes={edges} />
    <PrimaryBG>
      <Wrapper flexDirection="column" p={4} mx="auto">
        <Flex w={1} py={5} justifyContent="space-between" flexWrap="wrap">
          <ServiceImage>
            <img src={MayTheForce} alt="May the Force" />
          </ServiceImage>
          <ServiceText>
            <h2>Discover Drupal, the dark side of CMSs</h2>
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
            <img src={BeTheHero} alt="Be The Hero" />
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
    <Contact px={4} py={5} justifyContent="center" alignItems="center" flexDirection="column">
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
      filter: { fileAbsolutePath: { regex: "/cases.en/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            image {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_tracedSVG
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
