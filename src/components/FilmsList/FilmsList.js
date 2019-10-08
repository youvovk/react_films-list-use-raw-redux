import React from 'react';
import PropTypes from 'prop-types';

import { store } from '../../store/index';
import './FilmsList.scss';
import { FilmCard } from '../FilmCard';

export class FilmsList extends React.Component {
  state = {
    films: [],
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.getFilmsList);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getFilmsList = () => {
    this.setState({
      films: [...store.getState().films],
    });
  }

  render() {
    const { films } = this.state;

    return (
      <div className="films">
        {films.map(film => (
          <FilmCard key={film.id} {...film} />
        ))}
      </div>
    );
  }
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
