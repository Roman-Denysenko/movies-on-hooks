import React, { Component } from 'react';
import Form from '../../components/form';
import FetchMoviesSearch from '../../services/fetchMoviesSearch.js';
import MoviesList from '../../components/moviesList';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class MoviesPageViews extends Component {
  state = {
    search: '',
    movies: [],
    error: null,
    status: Status.IDLE,
  };

  async componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);

    if (query) {
      this.fetchMovies(query);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    const { search } = this.state;

    if (prevSearch !== nextSearch) {
      this.setState({
        status: Status.PENDING,
      });
      this.fetchMovies(search);
    }
  }

  fetchMovies = async search => {
    try {
      const response = await FetchMoviesSearch(search);
      const movies = response.data.results;
      this.setState({ movies, status: Status.RESOLVED });

      if (movies.length === 0) {
        return this.setState({
          error: `At your request  ${search}   nothing found`,
          status: Status.REJECTED,
        });
      }
    } catch (error) {
      this.setState({ error, status: Status.REJECTED });
    }
  };

  handleTakeDataFromForm = data => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${data}`,
    });

    this.setState({
      search: data,
    });
  };

  render() {
    const { movies, status, error } = this.state;

    if (status === 'idle') {
      return <Form onSubmit={this.handleTakeDataFromForm} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Form onSubmit={this.handleTakeDataFromForm} />
          <Loader
            type="Audio"
            color="#00BFFF"
            height={80}
            width={200}
            timeout={5000}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Form onSubmit={this.handleTakeDataFromForm} />
          <MoviesList movies={movies} />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Form onSubmit={this.handleTakeDataFromForm} />
          <div>{error}</div>;
        </>
      );
    }
  }
}

export default MoviesPageViews;
