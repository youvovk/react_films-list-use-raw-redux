import React from 'react';
import PropTypes from 'prop-types';
import './FilmsList.scss';
import { FilmCard } from '../FilmCard';

export const FilmsList = (props) => {
  const { films } = props;

  return (
    <div className="films">
      {films.map(film => (
        <FilmCard key={film.id} {...film} />
      ))}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
  })),
};

FilmsList.defaultProps = {
  films: [],
};
