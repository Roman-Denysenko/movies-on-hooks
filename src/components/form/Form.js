import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Form.module.css';

class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    search: ``,
  };

  handleChangeForm = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.onSubmit(search);
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={this.handleChangeForm}
          ></input>

          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Form;
