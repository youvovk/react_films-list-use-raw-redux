import React, { Component } from 'react';
import './App.scss';
import { FilmsList } from './components/FilmsList';
import { NewFilm } from './components/NewFilm';
import { films } from './data';

export class App extends Component {
  state = {
    filmsList: films,
  };

  handleAddFilm = (newFilm) => {
    this.setState(prevState => ({
      filmsList: [
        ...prevState.filmsList,
        {
          id: prevState.filmsList[prevState.filmsList.length - 1].id + 1,
          ...newFilm,
        },
      ],
    }));
  };

  render() {
    const { filmsList } = this.state;

    return (
      <div className="page">
        <div className="content">
          <FilmsList films={filmsList} />
        </div>
        <div className="sidebar">
          <NewFilm onAdd={this.handleAddFilm} />
        </div>
      </div>
    );
  }
}
