import React, { Component } from 'react';

import './App.scss';

import {
  HashRouter,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { store, addNewFilm } from './store/index';
import { FilmsList } from './components/FilmsList';
import { NewFilm } from './components/NewFilm';
import { FormField } from './components/FormField';
import { FilmDetails } from './components/FilmDetails';

const API_URL = 'https://www.omdbapi.com/?apikey=2f4a38c9&t=';
const FilmDetailsWithRouter = withRouter(FilmDetails);

export class App extends Component {
  state = {
    filmsList: [],
    searchWord: '',
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
      filmsList: [...store.getState().films],
    });
  }

  handleAddFilm = (newFilm) => {
    const prevState = store.getState().films;

    store.dispatch(addNewFilm(
      {
        id: prevState[prevState.length - 1].id + 1,
        ...newFilm,
      },
    ));
  };

  handleSearchChange = ({ target }) => {
    this.setState({ searchWord: target.value });
  };

  searchFilm = (searchWord) => {
    fetch(`${API_URL}${searchWord}`)
      .then(response => response.json())
      .then((data) => {
        const {
          Title,
          Plot,
          Poster,
          Website,
          imdbID,
        } = data;

        const newFilm = {
          id: imdbID,
          title: Title,
          description: Plot,
          imgUrl: Poster,
          imdbUrl: Website,
        };

        store.dispatch(addNewFilm(newFilm));
      });
  };

  render() {
    const { searchWord } = this.state;

    return (
      <HashRouter>
        <div className="page">
          <div className="content">
            <div className="box">
              <FormField
                value={searchWord}
                name="searchWord"
                placeholder="Type search word"
                label="Search film"
                onChange={this.handleSearchChange}
              />
              <button
                onClick={() => this.searchFilm(searchWord)}
                type="button"
                className="button is-primary"
              >
                Search film
              </button>
            </div>

            <Switch>
              <Route
                exact
                path="/"
                component={FilmsList}
              />
              <Route
                exact
                path="/film/:id"
                component={FilmDetailsWithRouter}
              />
            </Switch>
          </div>
          <div className="sidebar">
            <NewFilm onAdd={this.handleAddFilm} />
          </div>
        </div>
      </HashRouter>
    );
  }
}
