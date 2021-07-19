import actionTypes from '../actionsTypes';

export const actionListArticles = (articlesList) => ({
  type: actionTypes.getArticlesList,
  articlesList,
});

export const actionArticles = (articles) => ({
  type: actionTypes.getArticles,
  articles,
});

export const actionCompleteDownload = () => ({
  type: actionTypes.completeDownload,
});
export const actionCompleteDownloadArticle = () => ({
  type: actionTypes.completeDownloadArticle,
});

export const actionErrorDownload = () => ({
  type: actionTypes.errorDownload,
});

export const actionArticlesCount = (articlesCount) => ({
  type: actionTypes.articlesCount,
  articlesCount,
});

export const actionPage = (page) => ({
  type: actionTypes.page,
  page,
});

export const actionSuccessfulDeleteArticle = (successfulDeleteArticle) => ({
  type: actionTypes.successfulDeleteArticle,
  successfulDeleteArticle,
});

export const actionCreateArticle = (createArticle) => ({
  type: actionTypes.createArticle,
  createArticle,
});

export const actionSuccessfulCreateArticle = (successfulCreateArticle) => ({
  type: actionTypes.successfulCreateArticle,
  successfulCreateArticle,
});

export const actionModalConfirmationWindow = (modalConfirmationWindow) => ({
  type: actionTypes.modalConfirmationWindow,
  modalConfirmationWindow,
});
