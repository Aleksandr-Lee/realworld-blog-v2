import actionTypes from '../actionsTypes';

export const actionGetUser = (users) => ({
  type: actionTypes.getUser,
  users,
});

export const actionLogOut = () => ({
  type: actionTypes.logOut,
});

export const actionUpdateUser = (users) => ({
  type: actionTypes.updateUser,
  users,
});

export const actionSuccessfulLogin = (successfulLogin) => ({
  type: actionTypes.successfulLogin,
  successfulLogin,
});

export const actionSuccessfulCreate = (successfulCreate) => ({
  type: actionTypes.successfulCreate,
  successfulCreate,
});

export const actionSuccessfulEditProfile = (successfulEditProfile) => ({
  type: actionTypes.successfulEditProfile,
  successfulEditProfile,
});
