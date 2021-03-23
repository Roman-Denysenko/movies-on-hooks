import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './components/header';
import Loader from 'react-loader-spinner';
import './App.css';

const HomePage = lazy(() =>
  import('./views/HomePageView' /* webpackChunkName: "home-view" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPageView' /* webpackChunkName: "movie-view" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPageView' /* webpackChunkName: "moviesDetails-view" */
  ),
);

function App() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <Loader
            type="Audio"
            color="#00BFFF"
            height={80}
            width={200}
            timeout={5000}
          />
        }
      >
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
