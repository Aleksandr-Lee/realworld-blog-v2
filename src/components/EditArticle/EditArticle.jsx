/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 } from 'uuid';
import CreateEditForm from '../CreateEditForm';
import LoadingIndicator from '../LoadingIndicator';
import BlogService from '../../services/BlogService';
import route from '../../route';
import ErrorIndicator from '../ErrorIndicator';
import {
  actionArticles,
  actionCreateArticle,
  actionSuccessfulCreateArticle,
  actionCompleteDownloadArticle,
  actionErrorDownload,
} from '../../redux/actions/listArticles';

const EditArticle = ({ slug }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const successfulCreateArticle = useSelector(
    (state) => state.articlesReducer.successfulCreateArticle
  );
  const articles = useSelector((state) => state.articlesReducer.articles);
  const completeDownloadArticle = useSelector(
    (state) => state.articlesReducer.completeDownloadArticle
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const getSlug = () => {
    dispatch(actionCompleteDownloadArticle());
    new BlogService().getArticle(slug.slug).then((article) => {
      dispatch(actionArticles(article.article));
    });
  };

  if (articles === null) {
    getSlug();
  }

  if (!completeDownloadArticle) {
    return <LoadingIndicator />;
  }

  const valueInput = {
    title: articles.title,
    shortDescription: articles.description,
    text: articles.body,
    tagList: articles.tagList.map((tag) => ({
      id: v4(),
      text: tag,
    })),
  };

  if (successfulCreateArticle) {
    setTimeout(() => {
      dispatch(actionSuccessfulCreateArticle(false));
    }, 500);
    return <Redirect to={route.listArticles} />;
  }

  const editArticle = ({ title, shortDescription, text, tagList }) => {
    new BlogService()
      .editArticle(
        title,
        shortDescription,
        text,
        tagList,
        slug.slug,
        users.user.token
      )
      .then((article) => {
        dispatch(actionCreateArticle(article));
        dispatch(actionSuccessfulCreateArticle(true));
      })
      .catch(() => {
        dispatch(actionErrorDownload());
      });
  };

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  return (
    <CreateEditForm
      title="Edit article"
      submit={editArticle}
      valueInput={valueInput}
    />
  );
};

EditArticle.propTypes = {
  slug: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EditArticle;
