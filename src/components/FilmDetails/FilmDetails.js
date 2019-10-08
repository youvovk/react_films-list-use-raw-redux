/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { store } from '../../store/index';

export class FilmDetails extends Component {
  state = {
    film: [],
  };

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.getFilmsList);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getFilmsList = () => {
    const { match: { params: { id } } } = this.props;

    const film = store.getState().films.find(oneFilm => String(oneFilm.id) === id);

    this.setState({
      film,
    });
  }

  render() {
    const {
      film: {
        title,
        description,
        imgUrl,
        imdbUrl,
      },
    } = this.state;

    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={imgUrl}
              alt="Film logo"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/315W5zxAnTL._SY355_.png"
                  alt="imdb"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{title}</p>
            </div>
          </div>

          <div className="content">
            {description}
            <br />
            <a href={imdbUrl}>IMDB</a>
          </div>
        </div>
      </div>
    );
  }
}

FilmDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

FilmDetails.defaultProps = {
  description: '',
};
