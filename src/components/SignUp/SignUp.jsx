import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import constants from '../../constants';
import route from '../../route';
import Inputs from '../Inputs';
import { actionSuccessfulCreate } from '../../redux/actions/users';
import { actionErrorDownload } from '../../redux/actions/listArticles';
import classes from './SignUp.module.scss';

const SignUp = () => {
  const [blockForm, setBlockForm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const successfulCreate = useSelector(
    (state) => state.usersReducer.successfulCreate
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = ({ userName, emailAddress, password }) => {
    setBlockForm(true);
    new BlogService()
      .setUserRegistration(userName, emailAddress, password)
      .then((users) => {
        if (users.errors) {
          dispatch(actionSuccessfulCreate(users));
          setBlockForm(false);
        } else {
          dispatch(actionSuccessfulCreate(constants.SUCCESSFUL_REQUEST));
          setBlockForm(false);
          setTimeout(() => {
            setRedirect(true);
          }, 3000);
        }
      })
      .catch((error) => {
        dispatch(actionSuccessfulCreate(error.message));
        dispatch(actionErrorDownload());
      });
  };

  const createFailed =
    typeof successfulCreate === 'object' ? (
      <p className={classes.createError}>Such a user exists</p>
    ) : null;

  const createUser =
    successfulCreate === constants.SUCCESSFUL_REQUEST ? (
      <p className={classes.createSuccess}>
        You have successfully registered, redirect to sign-in page
      </p>
    ) : null;

  if (
    successfulCreate === constants.SUCCESSFUL_REQUEST ||
    typeof successfulCreate === 'object'
  ) {
    setTimeout(() => {
      dispatch(actionSuccessfulCreate(false));
    }, 3000);
  }

  if (redirect) {
    return <Redirect to={route.signIn} />;
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  return (
    <div className={classes.regForm}>
      {createFailed}
      {createUser}
      <div className={classes.regForm__container}>
        <h1 className={classes.regForm__title}>Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={classes.form} disabled={blockForm}>
            <Inputs
              label="Username"
              type="text"
              placeholder="Username"
              id="userName"
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
              label="Password"
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
              label="Repeat Password"
              type="password"
              placeholder="Repeat Password"
              id="repeatPassword"
              register={register}
              required
              errors={errors}
              errorObject={[
                { typeError: 'required', message: 'This is a required field' },
              ]}
            />
            {watch('password') !== watch('repeatPassword') && (
              <span className={classes.form__errorMessage}>
                Passwords must match
              </span>
            )}
            <hr className={classes.form__line} />
            <div className={classes.form__checkbox}>
              <input
                className={classes.checkbox__input}
                type="checkbox"
                id="checkbox"
                {...register('checkbox', { required: true })}
              />
              <label
                className={`${classes.checkbox__label} ${
                  errors.checkbox?.type ? `${classes.errorCheckbox}` : ''
                }`}
                htmlFor="checkbox"
              >
                I agree to the processing of my personal information
              </label>
            </div>
            <button className={classes.form__submit} type="submit">
              Create
            </button>
          </fieldset>
        </form>
        <div className={classes.footer}>
          <span className={classes.footer__text}>Already have an account?</span>
          <Link
            to={route.signIn}
            className={`${classes.footer__text} ${classes.footer__link}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
