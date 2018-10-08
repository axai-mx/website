import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { Flex } from 'grid-emotion';
import { FormattedMessage } from 'react-intl';
import Menu from './Menu';

const Wrapper = styled.footer`
  background: ${props => props.theme.colors.greyDark};
  color: ${props => props.theme.colors.greyLight};
  a {
    color: ${props => props.theme.colors.bg};
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`;

const Inner = styled(Flex)`
  @media (max-width: ${props => props.theme.breakpoint.l}) {
    justify-content: center;
    flex-direction: column;
    text-align: center;
    div:last-child {
      margin-top: 1rem;
    }
  }
`;

const StyledLink = styled(Link)`
  transform: translateX(0);
  transition: all 200ms ease-out;
  &:before {
    content: '←';
    padding-right: 8px;
  }
  &:hover {
    color: ${props => props.theme.colors.bg};
    transform: translateX(-6px);
  }
`;

const Footer = ({ isCase, locale, translation }) => {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <Inner justifyContent="space-between" p={4}>
        {isCase ? (
          <StyledLink to={locale === 'es' ? '/' : `/en`}>
            <FormattedMessage id="return-to-home" />
          </StyledLink>
        ) : (
          <div>
            Copyright &copy; {year} by Axai, forked from{' '}
            <a href="https://github.com/LeKoArts/gatsby-starter-portfolio-bella">Bella GitHub Repository</a>.
            Illustrations by <a href="https://undraw.co/illustrations">Undraw</a>.
          </div>
        )}
        <Menu translation={translation} />
      </Inner>
    </Wrapper>
  );
};

export default Footer;

Footer.propTypes = {
  isCase: PropTypes.bool,
  locale: PropTypes.string,
  translation: PropTypes.string,
};

Footer.defaultProps = {
  isCase: false,
  locale: 'es',
  translation: null,
};
