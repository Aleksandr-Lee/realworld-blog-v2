import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../Assets/Images/noAvatar.svg';
import route from '../../route';
import { actionLogOut } from '../../redux/actions/users';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const users = useSelector((state) => state.usersReducer.users);

  return (
    <header className={classes.header}>
      <div className={classes.header__wrapper}>
        <Link to={route.listArticles} className={classes.header__title}>
          Realdworld Blog
        </Link>
        {isAuth ? (
          <div className={classes.header__user}>
            <Link to={route.newArticle} className={classes.header__btnArticle}>
              Create article
            </Link>

            <Link to={route.profile} className={classes.header__userName}>
              {users.user.username}
            </Link>
            <Link to={route.profile}>
              {' '}
              <img
                className={classes.header__userFoto}
                src={
                  users.user.image === null || users.user.image === ''
                    ? noAvatar
                    : users.user.image
                }
                alt="foto"
              />
            </Link>
            <Link
              to={route.home}
              className={classes.header__logOut}
              onClick={() => dispatch(actionLogOut())}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div className={classes.header__authentication}>
            <Link
              to={route.signIn}
              className={`${classes.header__button} ${classes.button__signin}`}
            >
              Sign In
            </Link>
            <Link
              to={route.signUp}
              className={`${classes.header__button} ${classes.button__signup}`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
