import React, { Component } from 'react';
import { FormField } from '../FormField';

export class NewFilm extends Component {
  state = {
    title: {
      value: '',
      error: '',
    },
    description: {
      value: '',
      error: '',
    },
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
        error: prevState[name].error,
      },
    }));
  };

  render() {
    const {
      title,
      description,
    } = this.state;

    return (
      <form>
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
      </form>
    );
  }
}

NewFilm.propTypes = {};
