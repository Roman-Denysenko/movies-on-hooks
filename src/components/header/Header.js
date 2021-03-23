import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './Header.module.css';

const Header = () => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink
          exact
          to={routes.home}
          className={s.linkItem}
          activeClassName={s.active}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          exact
          to={routes.movies}
          className={s.linkItem}
          activeClassName={s.active}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Header;
