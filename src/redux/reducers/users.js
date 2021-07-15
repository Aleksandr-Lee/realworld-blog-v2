import actionTypes from '../actionsTypes';

const initialState = {
  users: false,
  isAuth: false,
  successfulLogin: false,
  successfulCreate: false,
  successfulEditProfile: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getUser:
      return {
        ...state,
        users: action.users,
        isAuth: true,
      };
    case actionTypes.logOut:
      localStorage.removeItem('token');
      return {
        ...state,
        users: {},
        isAuth: false,
      };
    case actionTypes.updateUser:
      return {
        ...state,
        users: action.users,
      };
    case actionTypes.successfulLogin:
      return {
        ...state,
        successfulLogin: action.successfulLogin,
      };
    case actionTypes.successfulCreate:
      return {
        ...state,
        successfulCreate: action.successfulCreate,
      };
    case actionTypes.successfulEditProfile:
      return {
        ...state,
        successfulEditProfile: action.successfulEditProfile,
      };
    default:
      return state;
  }
};

export default usersReducer;
