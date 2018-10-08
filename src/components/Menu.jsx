import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Menu = ({ locale, translation }) => {
  const transLink = translation || `/${locale}`;
  return (
    <div>
      <React.Fragment>
        <Link to={transLink}>
          <FormattedMessage id="translation" />
        </Link>
        <span> | </span>
      </React.Fragment>
      <Link to={`${locale}/blog`}>Blog</Link> | <Link to="https://twitter.com/axaimx">Twitter</Link>
    </div>
  );
};

export default Menu;

Menu.propTypes = {
  locale: PropTypes.string,
  translation: PropTypes.string,
};

Menu.defaultProps = {
  locale: 'es',
  translation: null,
};
