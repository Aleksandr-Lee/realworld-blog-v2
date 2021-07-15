import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Article from '../Article';
import LoadingIndicator from '../LoadingIndicator';
import PaginationArticle from '../PaginationArticle';
import ErrorIndicator from '../ErrorIndicator';
import BlogService from '../../services/BlogService';
import {
  actionListArticles,
  actionCompleteDownload,
  actionErrorDownload,
  actionArticlesCount,
  actionPage,
} from '../../redux/actions/listArticles';
import classes from './ListArticles.module.scss';

const ListArticles = () => {
  const dispatch = useDispatch();
  const articlesList = useSelector(
    (state) => state.articlesReducer.articlesList
  );
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const page = useSelector((state) => state.articlesReducer.page);

  const articlesCount = useSelector(
    (state) => state.articlesReducer.articlesCount
  );

  const articlesDisplay = useCallback(
    (offset) => {
      dispatch(actionCompleteDownload());
      new BlogService()
        .getListArticles(offset)
        .then((articles) => {
          dispatch(actionListArticles(articles.articles));
          if (articlesCount === 1) {
            dispatch(actionArticlesCount(articles.articlesCount));
          }
        })
        .catch(() => {
          dispatch(actionCompleteDownload());
          dispatch(actionErrorDownload());
        });
    },
    [dispatch, articlesCount]
  );

  useEffect(() => {
    articlesDisplay(page);
  }, [articlesDisplay, page]);

  const handlePageClick = (changePage) => {
    dispatch(actionPage(changePage));
  };

  const pagination = completeDownload ? (
    <PaginationArticle handlePageClick={handlePageClick} />
  ) : null;

  const loadingIndicator = !completeDownload ? <LoadingIndicator /> : null;
  if (errorDownload) {
    return <ErrorIndicator />;
  }

  const articleList = articlesList.map((item) => (
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

  return (
    <>
      <ul className={classes.container}>
        {loadingIndicator}
        {articleList}
      </ul>
      {pagination}
    </>
  );
};

export default ListArticles;
