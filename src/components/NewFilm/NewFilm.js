import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../FormField';
import { required } from '../../validation';

const initialState = {
  title: {
    value: '',
    error: null,
  },
  description: {
    value: '',
    error: null,
  },
  imgUrl: {
    value: '',
    error: null,
  },
  imdbUrl: {
    value: '',
    error: null,
  },
};

const formValidators = {
  title: required,
  imgUrl: required,
  imdbUrl: required,
};

export class NewFilm extends Component {
  state = initialState;

  getFormValue() {
    return Object.entries(this.state)
      .reduce((acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1].value,
      }), {});
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
        error: prevState[name].error,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const formValue = this.getFormValue();

    const { hasError, errors } = this.validate();

    if (hasError) {
      this.setState((prevState) => {
        const newState = errors.map(([name, error]) => {
          return [
            name,
            {
              error,
              value: prevState[name].value,
            },
          ];
        });

        return Object.fromEntries(newState);
      });
    } else {
      this.setState(initialState);
      onAdd(formValue);
    }
  };

  validate() {
    const errors = Object.entries(this.state)
      .map(([name, fieldData]) => {
        const validator = formValidators[name];
        const error = validator
          ? validator(name, fieldData.value)
          : null;

        return [name, error];
      });

    const hasError = errors
      .some(errorData => !!errorData[1]);

    return {
      hasError,
      errors,
    };
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormField
          {...title}
          name="title"
          placeholder="Input film title"
          label="Title"
          onChange={this.handleChange}
        />
        <FormField
          {...description}
          type="textarea"
          name="description"
          placeholder="Input film description"
          label="Description"
          onChange={this.handleChange}
        />
        <FormField
          {...imgUrl}
          name="imgUrl"
          placeholder="Paste image url"
          label="Image url"
          onChange={this.handleChange}
        />
        <FormField
          {...imdbUrl}
          name="imdbUrl"
          placeholder="Paste IMDB url"
          label="IMDB url"
          onChange={this.handleChange}
        />

        <button
          type="submit"
          className="button is-primary"
        >
          Add film
        </button>
      </form>
    );
  }
}

NewFilm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
