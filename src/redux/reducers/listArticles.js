import actionTypes from '../actionsTypes';

const initialState = {
  articlesList: [],
  articles: null,
  completeDownload: false,
  completeDownloadArticle: false,
  errorDownload: false,
  articlesCount: 1,
  page: 1,
  successfulDeleteArticle: false,
  createArticle: null,
  successfulCreateArticle: false,
  modalConfirmationWindow: false,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getArticlesList:
      return {
        ...state,
        articlesList: action.articlesList,
        completeDownload: true,
      };
    case actionTypes.getArticles:
      return {
        ...state,
        articles: action.articles,
        completeDownloadArticle: true,
      };
    case actionTypes.completeDownload:
      return {
        ...state,
        articlesList: [],
        completeDownload: false,
      };
    case actionTypes.completeDownloadArticle:
      return {
        ...state,
        articles: null,
        completeDownloadArticle: false,
      };
    case actionTypes.errorDownload:
      return {
        ...state,
        errorDownload: true,
      };
    case actionTypes.articlesCount:
      return {
        ...state,
        articlesCount: state.articlesCount + action.articlesCount - 1,
      };
    case actionTypes.page:
      return {
        ...state,
        page: action.page,
      };
    case actionTypes.successfulDeleteArticle:
      return {
        ...state,
        successfulDeleteArticle: action.successfulDeleteArticle,
      };
    case actionTypes.createArticle:
      return {
        ...state,
        createArticle: action.createArticle,
      };
    case actionTypes.successfulCreateArticle:
      return {
        ...state,
        successfulCreateArticle: action.successfulCreateArticle,
      };
    case actionTypes.modalConfirmationWindow:
      return {
        ...state,
        modalConfirmationWindow: action.modalConfirmationWindow,
      };
    default:
      return state;
  }
};

export default articlesReducer;
