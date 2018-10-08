import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import { Flex } from 'grid-emotion';
import { rgba } from 'polished';
import { randomNumber } from '../utils/randomNumber';

const Item = styled(Flex)`
  flex-basis: calc(99.9% * 1 / 2 - 4rem);
  max-width: calc(99.9% * 1 / 2 - 4rem);
  width: calc(99.9% * 1 / 2 - 4rem);
  text-align: center;
  position: relative;
  @media (max-width: ${props => props.theme.breakpoint.m}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-top: 3rem !important;
  }
`;

const ItemTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
`;

const ItemUser = styled.p`
  color: ${props => props.theme.colors.greyMedium};
`;

const GridItem = ({ uid, title, user, excerpt }) => (
  <Item flexDirection="column" key={uid} style={{ marginTop: `${randomNumber(4, 8) * 2}rem` }}>
    <Link to={uid}>
      <ItemTitle>{title}</ItemTitle>
    </Link>
    <ItemUser>{user}</ItemUser>
    <div>{excerpt}</div>
  </Item>
);

export default GridItem;

GridItem.propTypes = {
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};
