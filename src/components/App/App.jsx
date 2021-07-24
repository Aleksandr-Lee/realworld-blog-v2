import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import ListArticles from '../ListArticles';
import BlogService from '../../services/BlogService';
import LocalStorageService from '../../services/LocalStorageService';
import ArticlePage from '../ArticlePage';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';
import CreateArticle from '../CreateArticle';
import MyArticles from '../MyArticles';
import EditArticle from '../EditArticle';
import PrivateRoute from '../PrivateRoute';
import route from '../../route';
import { actionGetUser } from '../../redux/actions/users';
import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  useEffect(() => {
    const token = LocalStorageService.getToken();
    if (token) {
      new BlogService().getCurrentUsers().then((users) => {
        dispatch(actionGetUser(users));
      });
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path={route.home} component={ListArticles} exact />
          <Route path={route.listArticles} component={ListArticles} exact />
          <Route
            path={`${route.articles}${route.slug}${route.edit}`}
            render={({ match }) => <EditArticle slug={match.params} />}
          />
          <Route
            path={`${route.articles}${route.slug}`}
            render={({ match }) => <ArticlePage slug={match.params} />}
          />
          {!isAuth && <Route path={route.signIn} component={SignIn} exact />}
          {!isAuth && <Route path={route.signUp} component={SignUp} exact />}
          {isAuth && <Route path={route.profile} component={Profile} exact />}
          {isAuth && (
            <Route path={route.myArticles} component={MyArticles} exact />
          )}
          <PrivateRoute
            path={route.newArticle}
            component={CreateArticle}
            exact
          />

          <Route
            render={() => <h2 className={classes.noPage}>Page not found</h2>}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
