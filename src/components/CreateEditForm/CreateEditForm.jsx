import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Inputs from '../Inputs';
import classes from './CreateEditForm.module.scss';

const CreateEditForm = ({ title, submit, valueInput }) => {
  const tagValue = !valueInput.tagList.length ? [''] : valueInput.tagList;
  const [tags, setTags] = useState(tagValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    submit({ ...data, tagList: tags });
  };

  const onAddTag = () => {
    const newTags = [...tags, ''];
    setTags(newTags);
  };

  const onDeleteTag = (indexTags) => {
    const newTags = tags.filter((_tag, index) => indexTags !== index);
    setTags(newTags);
  };

  const inputValueTag = (event, index) => {
    event.preventDefault();
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const tagsList = tags.map((_tag, index) => (
    <div key={String(index)}>
      <input
        className={classes.formTags__tags}
        type="text"
        placeholder="Tag"
        value={tags[index]}
        onChange={(event) => inputValueTag(event, index)}
      />
      <button
        disabled={tags.length === 1}
        className={classes.formTags__delete}
        type="button"
        onClick={() => onDeleteTag(index)}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className={classes.createEditArticleForm}>
      <div className={classes.createEditArticleForm__container}>
        <h1 className={classes.createEditArticleForm__title}>{title}</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            label="Title"
            type="text"
            placeholder="Title"
            id="title"
            defaultValue={valueInput.title}
            register={register}
            required
            errors={errors}
            errorObject={[
              { typeError: 'required', message: 'This is a required field' },
            ]}
          />
          <Inputs
            label="Short description"
            type="text"
            placeholder="Short description"
            id="shortDescription"
            defaultValue={valueInput.shortDescription}
            register={register}
            required
            errors={errors}
            errorObject={[
              { typeError: 'required', message: 'This is a required field' },
            ]}
          />
          <label className={classes.form__label} htmlFor="text">
            Text
          </label>
          <textarea
            className={`${classes.form__textarea} ${
              errors.text?.type
                ? `${classes.form__input} ${classes.error}`
                : `${classes.form__input}`
            }`}
            type="text"
            placeholder="Text"
            defaultValue={valueInput.text}
            id="text"
            {...register('text', {
              required: true,
            })}
          />
          {errors.text?.type === 'required' && (
            <span className={classes.form__errorMessage}>
              This is a required field
            </span>
          )}
          <div className={classes.formTags}>
            <label className={classes.formTags__label} htmlFor="tags">
              Tags
            </label>
            <div className={classes.formTags__blockTags}>
              <div className={classes.formTags__tagsWrapper}> {tagsList} </div>
              <button
                className={classes.formTags__submitTags}
                type="button"
                onClick={onAddTag}
              >
                Add tag
              </button>
            </div>
          </div>
          <button className={classes.form__submit} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

CreateEditForm.defaultProps = {
  submit: () => {},
};

CreateEditForm.propTypes = {
  title: PropTypes.string.isRequired,
  submit: PropTypes.func,
  valueInput: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    text: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CreateEditForm;
