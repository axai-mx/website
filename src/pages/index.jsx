import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import { Flex } from 'grid-emotion';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ProjectListing from '../components/ProjectListing';
import BeTheHero from '../images/be_the_hero.svg';
import DataReport from '../images/data_report.svg';
import MayTheForce from '../images/may_the_force.svg';

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
  <Layout locale="es">
    <header>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <img src="/axai.png" alt="axai" />
        <h1>Axai, los expertos en Drupal</h1>
        <big>
          <center>
            En Axai nos gusta desarrollar aplicaciones móviles y aplicaciones web basadas en la plataforma Drupal, y nos
            encargamos de hacer que dichas aplicaciones se integren perfectamente con todo aquel sistema externo que sea
            necesario.
          </center>
          <br />
          <center>
            Nos especializamos en la migración de sistemas a la plataforma Drupal y en mejorar el rendimiento de
            sistemas Drupal existentes.
          </center>
        </big>
      </Flex>
    </header>
    <ProjectListing nodes={edges} />
    <PrimaryBG>
      <Wrapper flexDirection="column" p={4} mx="auto">
        <Flex w={1} py={5} justifyContent="space-between" flexWrap="wrap">
          <ServiceImage>
            <img src={BeTheHero} alt="Be The Hero" />
          </ServiceImage>
          <ServiceText>
            <h2>Descubre Drupal</h2>
            <p>
              Desarrollamos sitios y aplicaciones web en Drupal, el sistema de administración de contenidos. ¿Necesitas
              saber el cómo, el qué, el porqué y el quién?...
            </p>
            <ul>
              <li>Flexible</li>
              <li>Para sitios pequeños y grandes</li>
              <li>Más que un CMS, es un framework</li>
            </ul>
          </ServiceText>
        </Flex>
        <Flex w={1} py={5} justifyContent="space-between" flexDirection="row-reverse" flexWrap="wrap">
          <ServiceImage>
            <img src={DataReport} alt="Data Report" />
          </ServiceImage>
          <ServiceText>
            <h2>Lo tenemos cubierto</h2>
            <p>
              Nosotros instalamos, configuramos, implementamos y echamos a andar Drupal desde cero, pero también podemos
              ayudarte a mejorar un sitio existente, o resolver problemas en instalaciones existentes...
            </p>
            <ul>
              <li>Migraciones</li>
              <li>Optimización de desempeño</li>
            </ul>
          </ServiceText>
        </Flex>
        <Flex w={1} py={5} justifyContent="space-between" flexWrap="wrap">
          <ServiceImage>
            <img src={MayTheForce} alt="May the Force" />
          </ServiceImage>
          <ServiceText>
            <h2>También aplicaciones móviles</h2>
            <p>
              Pero no solo eso, también desarrollamos aplicaciones móviles utilizando Drupal como backend, de hecho
              Drupal se comunica perfectamente con una gran cantidad de sistemas...
            </p>
            <ul>
              <li>Headless drupal</li>
              <li>iOS y Android</li>
              <li>E-Commerce</li>
            </ul>
          </ServiceText>
        </Flex>
      </Wrapper>
    </PrimaryBG>
    <Contact px={4} py={6} justifyContent="center" alignItems="center" flexDirection="column">
      <h1>¡Contáctanos!</h1>
      <h3>info@axai.com.mx</h3>
    </Contact>
    <Footer translation="/en" />
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
  query IndexQuery {
    caseStudies: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/cases.es/" } }
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
