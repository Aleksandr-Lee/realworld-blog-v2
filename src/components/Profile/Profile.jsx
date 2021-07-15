import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import Inputs from '../Inputs';
import constants from '../../constants';
import {
  actionUpdateUser,
  actionSuccessfulEditProfile,
} from '../../redux/actions/users';
import { actionErrorDownload } from '../../redux/actions/listArticles';

import classes from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const successEditProfile = useSelector(
    (state) => state.usersReducer.successfulEditProfile
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ userName, emailAddress, password, avatarImage }) => {
    new BlogService()
      .updateUser(userName, emailAddress, password, avatarImage)
      .then((user) => {
        if (user.errors) {
          dispatch(actionSuccessfulEditProfile(user));
        } else {
          dispatch(actionUpdateUser(user));
          dispatch(actionSuccessfulEditProfile(constants.SUCCESSFUL_REQUEST));
        }
      })
      .catch((error) => {
        dispatch(actionSuccessfulEditProfile(error.message));
        dispatch(actionErrorDownload());
      });
  };

  const editUser =
    successEditProfile === constants.SUCCESSFUL_REQUEST ? (
      <p className={classes.successProfile}>Profile data changed</p>
    ) : null;

  const editProfileError =
    typeof successEditProfile === 'object' ? (
      <p className={classes.editProfileError}>
        A user with such data already exists
      </p>
    ) : null;

  if (
    successEditProfile === constants.SUCCESSFUL_REQUEST ||
    typeof successEditProfile === 'object'
  ) {
    setTimeout(() => {
      dispatch(actionSuccessfulEditProfile(false));
    }, 5000);
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  return (
    <div className={classes.editProfile}>
      {editUser}
      {editProfileError}
      <div className={classes.editProfile__container}>
        <h1 className={classes.editProfile__title}>Edit Profile</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            label="Username"
            type="text"
            placeholder="Username"
            id="userName"
            defaultValue={users.user.username}
            register={register}
            required
            minLength={3}
            maxLength={20}
            errors={errors}
            errorObject={[
              { typeError: 'required', message: 'This is a required field' },
              {
                typeError: 'minLength',
                message: 'Username must be between 3 and 20 characters',
              },
              {
                typeError: 'maxLength',
                message: 'Username must be between 3 and 20 characters',
              },
            ]}
          />
          <Inputs
            label="Email address"
            type="text"
            placeholder="Email address"
            id="emailAddress"
            defaultValue={users.user.email}
            register={register}
            required
            errors={errors}
            errorObject={[
              { typeError: 'required', message: 'This is a required field' },
              {
                typeError: 'pattern',
                message: 'Invalid email address',
              },
            ]}
            pattern={/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/}
          />
          <Inputs
            label="New password"
            type="password"
            placeholder="Password"
            id="password"
            register={register}
            required
            minLength={8}
            maxLength={40}
            errors={errors}
            errorObject={[
              { typeError: 'required', message: 'This is a required field' },
              {
                typeError: 'minLength',
                message: 'Your password needs to be at least 8 characters.',
              },
              {
                typeError: 'maxLength',
                message:
                  'Your password must be no more than 40 characters long.',
              },
            ]}
          />
          <Inputs
            label="Avatar image (url)"
            type="text"
            placeholder="Avatar image"
            id="avatarImage"
            defaultValue={users.user.image}
            register={register}
            required={false}
            pattern={
              /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i
            }
            errors={errors}
            errorObject={[
              {
                typeError: 'pattern',
                message: 'Invalid url address.',
              },
            ]}
          />
          <button className={classes.form__submit} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
