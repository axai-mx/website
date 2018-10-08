import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'react-emotion';
import sample from 'lodash/sample';
import { Flex } from 'grid-emotion';

const Wrapper = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
  margin: 2rem 0;
`;

const Item = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: none;
    }
  }
`;

const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;
    > div {
      position: static !important;
    }
  }
`;

const Overlay = styled(Flex)`
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const overlay = ['#f76262', '#216583', '#65c0ba', '#35477d', '#6c5b7b', '#203541', '#9951ff', '#480032'];

const ProjectListing = ({ nodes }) => (
  <Wrapper>
    {nodes.map(c => {
      const overlayColor = sample(overlay);
      return (
        <Item key={c.node.fields.slug}>
          <Content>
            <ImageWrapper>
              <Image fluid={c.node.frontmatter.image.childImageSharp.fluid} />
            </ImageWrapper>
            <Link to={c.node.fields.slug}>
              <Overlay style={{ backgroundColor: overlayColor }} />
              <h2>{c.node.frontmatter.title}</h2>
              <div>{c.node.frontmatter.type}</div>
            </Link>
          </Content>
        </Item>
      );
    })}
  </Wrapper>
);

export default ProjectListing;

ProjectListing.propTypes = {
  nodes: PropTypes.array.isRequired,
};
