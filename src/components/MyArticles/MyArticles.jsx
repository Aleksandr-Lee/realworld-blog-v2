import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../Article';
import BlogService from '../../services/BlogService';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import {
  actionMyArticles,
  actionCompleteDownload,
  actionErrorDownload,
} from '../../redux/actions/listArticles';
import classes from './MyArticles.module.scss';

const MyArticles = () => {
  const [countArticles, setCountArticles] = useState(0);
  const dispatch = useDispatch();
  const myArticles = useSelector((state) => state.articlesReducer.myArticles);
  const users = useSelector((state) => state.usersReducer.users);
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  useEffect(() => {
    dispatch(actionCompleteDownload());
    new BlogService()
      .myArticles(users.user.username)
      .then((articles) => {
        setCountArticles(articles.articlesCount);
        dispatch(actionMyArticles(articles.articles));
      })
      .catch(() => {
        dispatch(actionCompleteDownload());
        dispatch(actionErrorDownload());
      });
  }, [dispatch, users]);

  const myArticlesList = myArticles.map((item) => (
    <Article
      key={item.slug}
      title={item.title}
      description={item.description}
      slug={item.slug}
      username={item.author.username}
      body={item.body}
      favorited={item.favorited}
      favoritesCount={item.favoritesCount}
      image={item.author.image}
      updatedAt={item.updatedAt}
      tagList={item.tagList}
    />
  ));

  const loadingIndicator = !completeDownload ? <LoadingIndicator /> : null;
  if (errorDownload) {
    return <ErrorIndicator />;
  }

  if (countArticles === 0 && completeDownload) {
    return <h1 className={classes.noArticles}>No articles</h1>;
  }
  return (
    <>
      <ul>
        {loadingIndicator}
        {myArticlesList}
      </ul>
    </>
  );
};

export default MyArticles;
