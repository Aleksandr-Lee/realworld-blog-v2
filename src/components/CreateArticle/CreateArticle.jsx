import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import CreateEditForm from '../CreateEditForm';
import ErrorIndicator from '../ErrorIndicator';
import route from '../../route';
import {
  actionCreateArticle,
  actionSuccessfulCreateArticle,
  actionErrorDownload,
} from '../../redux/actions/listArticles';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const successfulCreateArticle = useSelector(
    (state) => state.articlesReducer.successfulCreateArticle
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const valueInput = {
    title: '',
    shortDescription: '',
    text: '',
    tagList: [''],
  };

  if (successfulCreateArticle) {
    setTimeout(() => {
      dispatch(actionSuccessfulCreateArticle(false));
    }, 500);
    return <Redirect to={route.listArticles} />;
  }

  const createArticle = (data) => {
    new BlogService()
      .createArticle(data)
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
      title="Create new article"
      submit={createArticle}
      valueInput={valueInput}
    />
  );
};

export default CreateArticle;
