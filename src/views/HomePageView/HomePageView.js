import React, { useEffect, useState } from 'react';
import FetchMoviesPage from '../../services/fetchMoviesPage.js';
import MoviesList from '../../components/moviesList';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const HomePageView = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    async function fetchApi() {
      setStatus(Status.PENDING);

      try {
        const response = await FetchMoviesPage();
        setMovies(response.data.results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }
    fetchApi();
  }, []);

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return (
      <>
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
    return <MoviesList movies={movies} />;
  }

  if (status === 'rejected') {
    return <div>{error}</div>;
  }
};

export default HomePageView;

// class HomePageView extends Component {
//   state = {
//     movies: [],
//     error: null,
//     status: Status.IDLE,
//   };

//   async componentDidMount(prevProps, prevState) {
// this.setState({
//   status: Status.PENDING,
// });

// try {
//   const response = await FetchMoviesPage();
//   this.setState({ movies: response.data.results, status: Status.RESOLVED });
// } catch (error) {
//   this.setState({ error, status: Status.REJECTED });
// }
//   }

//   render() {
//     const { movies, status, error } = this.state;

// if (status === 'idle') {
//   return null;
// }

// if (status === 'pending') {
//   return (
//     <>
//       <Loader
//         type="Audio"
//         color="#00BFFF"
//         height={80}
//         width={200}
//         timeout={5000}
//       />
//     </>
//   );
// }

// if (status === 'resolved') {
//   return <MoviesList movies={movies} />;
// }

// if (status === 'rejected') {
//   return <div>{error}</div>;
// }
//   }
// }

// export default HomePageView;
