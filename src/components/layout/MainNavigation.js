import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>Great Logo</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to='/quotes' activeClassName={classes.active}>
                All quotes{' '}
              </NavLink>
            </li>
            <li>
              <NavLink to='/new-quote' activeClassName={classes.active}>
                Add quote{' '}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
}

export default MainNavigation;
