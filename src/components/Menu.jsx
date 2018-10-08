import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Menu = ({ translation }) => (
  <div>
    {translation ? (
      <React.Fragment>
        <Link to={translation}>
          <FormattedMessage id="translation" />
        </Link>
        <span> | </span>
      </React.Fragment>
    ) : null}
    Musicaly | Twitter
  </div>
);

export default Menu;

Menu.propTypes = {
  translation: PropTypes.string,
};

Menu.defaultProps = {
  translation: null,
};
