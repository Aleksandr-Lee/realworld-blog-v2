import { combineReducers } from 'redux';
import articlesReducer from './listArticles';
import usersReducer from './users';

const rootReducer = combineReducers({
  articlesReducer,
  usersReducer,
});

export default rootReducer;
