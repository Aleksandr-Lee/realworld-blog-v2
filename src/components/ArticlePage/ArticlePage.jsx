import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionArticles,
  actionErrorDownload,
  actionCompleteDownloadArticle,
  actionModalConfirmationWindow,
} from '../../redux/actions/listArticles';
import LoadingIndicator from '../LoadingIndicator';
import ModalConfirmationWindow from '../ModalConfirmationWindow';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import Like from '../Like';
import route from '../../route';
import classes from './ArticlePage.module.scss';

const ArticlePage = ({ slug }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const users = useSelector((state) => state.usersReducer.users);
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const completeDownloadArticle = useSelector(
    (state) => state.articlesReducer.completeDownloadArticle
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const modalConfirmationWindow = useSelector(
    (state) => state.articlesReducer.modalConfirmationWindow
  );

  const getSlug = useCallback(() => {
    dispatch(actionCompleteDownloadArticle());
    new BlogService()
      .getArticle(slug.slug)
      .then((articlesList) => {
        dispatch(actionArticles(articlesList.article));
      })
      .catch(() => {
        dispatch(actionCompleteDownloadArticle());
        dispatch(actionErrorDownload());
      });
  }, [dispatch, slug.slug]);

  useEffect(() => {
    getSlug();
  }, [getSlug]);

  if (!completeDownloadArticle && !errorDownload) {
    return <LoadingIndicator />;
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  if (articles !== null) {
    const dateArticle = format(new Date(articles.updatedAt), 'MMMM dd, yyyy');

    const tag = articles.tagList.map((item) => (
      <span className={classes.articlePage__tag} key={item}>
        {item}
      </span>
    ));

    return (
      <li className={classes.articlePage}>
        <div className={classes.articlePage__header}>
          <div>
            <div className={classes.articlePage__data}>
              <span className={classes.articlePage__title}>
                {articles.title}
              </span>
              <Like
                favorited={articles.favorited}
                favoritesCount={articles.favoritesCount}
                slug={slug.slug}
              />
            </div>
            {tag}
          </div>
          <div className={classes.profile}>
            <div className={classes.profile__data}>
              <span className={classes.profile__name}>
                {articles.author.username}
              </span>
              <span className={classes.profile_date}>{dateArticle}</span>
            </div>
            <img
              className={classes.profile__foto}
              src={articles.author.image}
              alt="foto"
            />
          </div>
        </div>
        <div className={classes.block__textButton}>
          <p className={classes.articlePage__description}>
            {articles.description}
          </p>
          {isAuth && users.user.username === articles.author.username ? (
            <div>
              <button
                className={`${classes.button} ${classes.button__delete}`}
                type="button"
                onClick={() => dispatch(actionModalConfirmationWindow(true))}
              >
                Delete
              </button>
              <Link
                to={`${route.articles}${slug.slug}${route.edit}`}
                className={`${classes.button} ${classes.button__edit}`}
                type="button"
              >
                Edit
              </Link>
            </div>
          ) : null}
          {modalConfirmationWindow ? (
            <ModalConfirmationWindow slug={slug} />
          ) : null}
        </div>
        <ReactMarkdown className={classes.articlePage__body}>
          {articles.body}
        </ReactMarkdown>
      </li>
    );
  }
  return null;
};

ArticlePage.propTypes = {
  slug: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ArticlePage;
