import React, { useEffect, useState } from 'react';
import FetchMoviesDetailPage from '../../services/fetchMovieDetailsPage.js';
import Cast from '../../components/cast';
import Reviews from '../../components/reviews';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import routers from '../../routes';
import Loader from 'react-loader-spinner';
import s from './MovieDetailsPage.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MovieDetailsPage = ({ match }) => {
  const [title, setTitle] = useState(null);
  const [name, setName] = useState(null);
  const [poster_path, setPoster_path] = useState(null);
  const [overview, setOverview] = useState(null);
  const [genres, setGenres] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    async function fetchApi() {
      setStatus(Status.PENDING);

      const { movieId } = match.params;

      if (movieId) {
        try {
          const response = await FetchMoviesDetailPage(movieId);
          const { title, name, poster_path, overview, genres } = response.data;
          setTitle(title);
          setName(name);
          setPoster_path(poster_path);
          setOverview(overview);
          setGenres(genres);
          setMovieId(movieId);
          setStatus(Status.RESOLVED);
        } catch (error) {
          setError(error);
          setStatus(Status.REJECTED);
        }
      }
    }
    fetchApi();
  }, []);

  const handleGoBack = () => {
    history.push(location?.state?.from || routers.movies);
  };

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
    return (
      <>
        <section>
          <button type="button" className={s.button} onClick={handleGoBack}>
            Go back
          </button>
          <h1>{title || name}</h1>
          <div className={s.moviesContainer}>
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                alt="poster"
                className={s.img}
              ></img>
            )}
            <div>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              {genres && (
                <ul>
                  {genres.map(item => (
                    <li key={genres.indexOf(item)}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section>
          <h2>Additional information</h2>
          <ul>
            <li>
              <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </section>

        <section>
          <Switch>
            <Route
              path={`/movies/${movieId}/cast`}
              render={props => {
                return movieId && <Cast id={movieId} />;
              }}
            />
            <Route
              path={`/movies/${movieId}/reviews`}
              render={props => {
                return movieId && <Reviews id={movieId} />;
              }}
            />
          </Switch>
        </section>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <div>{error}</div>
      </>
    );
  }
};

export default MovieDetailsPage;

// class MovieDetailsPage extends Component {
//   state = {
//     title: null,
//     name: null,
//     poster_path: null,
//     overview: null,
//     genres: null,
//     movieId: null,
//     status: Status.IDLE,
//     error: null,
//   };

//   async componentDidMount() {
// this.setState({
//   status: Status.PENDING,
// });

// const { movieId } = this.props.match.params;

// if (movieId) {
//   try {
//     const response = await FetchMoviesDetailPage(movieId);
//     const { title, name, poster_path, overview, genres } = response.data;
//     this.setState({
//       title,
//       name,
//       poster_path,
//       overview,
//       genres,
//       movieId,
//       status: Status.RESOLVED,
//     });
//   } catch (error) {
//     this.setState({ error, status: Status.REJECTED });
//   }
// }
//   }

// handleGoBack = () => {
//   const { location, history } = this.props;
//   history.push(location?.state?.from || routers.movies);
// };

//   render() {
//     const {
//       title,
//       name,
//       poster_path,
//       overview,
//       genres,
//       movieId,
//       status,
//       error,
//     } = this.state;

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
//   return (
//     <>
//       <section>
//         <button
//           type="button"
//           className={s.button}
//           onClick={this.handleGoBack}
//         >
//           Go back
//         </button>
//         <h1>{title || name}</h1>
//         <div className={s.moviesContainer}>
//           {poster_path && (
//             <img
//               src={`https://image.tmdb.org/t/p/w200${poster_path}`}
//               alt="poster"
//               className={s.img}
//             ></img>
//           )}
//           <div>
//             <h2>Overview</h2>
//             <p>{overview}</p>
//             <h3>Genres</h3>
//             {genres && (
//               <ul>
//                 {genres.map(item => (
//                   <li key={genres.indexOf(item)}>{item.name}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </section>

//       <section>
//         <h2>Additional information</h2>
//         <ul>
//           <li>
//             <Link to={`/movies/${movieId}/cast`}>Cast</Link>
//           </li>
//           <li>
//             <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
//           </li>
//         </ul>
//       </section>

//       <section>
//         <Switch>
//           <Route
//             path={`/movies/${movieId}/cast`}
//             render={props => {
//               return movieId && <Cast id={movieId} />;
//             }}
//           />
//           <Route
//             path={`/movies/${movieId}/reviews`}
//             render={props => {
//               return movieId && <Reviews id={movieId} />;
//             }}
//           />
//         </Switch>
//       </section>
//     </>
//   );
// }

// if (status === 'rejected') {
//   return (
//     <>
//       <div>{error}</div>
//     </>
//   );
// }
//   }
// }

// export default MovieDetailsPage;
