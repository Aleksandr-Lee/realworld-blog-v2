import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import Like from '../Like';
import route from '../../route';
import classes from './Article.module.scss';

const Article = ({
  title,
  username,
  description,
  favorited,
  favoritesCount,
  image,
  updatedAt,
  tagList,
  slug,
}) => {
  const dateArticle = format(new Date(updatedAt), 'MMMM dd, yyyy');
  const tag = tagList.map((item) => (
    <span className={classes.article__tag} key={item}>
      {item}
    </span>
  ));

  return (
    <li className={classes.article}>
      <div className={classes.article__header}>
        <div>
          <div className={classes.article__data}>
            <Link
              to={`${route.articles}${slug}`}
              className={classes.article__title}
            >
              {title}
            </Link>
            <Like
              favorited={favorited}
              favoritesCount={favoritesCount}
              slug={slug}
            />
          </div>
          {tag}
        </div>
        <div className={classes.profile}>
          <div className={classes.profile__data}>
            <span className={classes.profile__name}>{username}</span>
            <span className={classes.profile__date}>{dateArticle}</span>
          </div>
          <img className={classes.profile__foto} src={image} alt="foto" />
        </div>
      </div>
      <p className={classes.article__description}>{description}</p>
    </li>
  );
};

Article.defaultProps = {
  favorited: false,
  favoritesCount: 0,
  image: null,
  updatedAt: '',
  tagList: [''],
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  image: PropTypes.string,
  updatedAt: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
};

export default Article;
