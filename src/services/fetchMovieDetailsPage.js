import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '42e4f7e7a08186209560ab6d6e4df7d1';

const FetchMoviesDetailPage = async id => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`,
    );
    return response;
  } catch (error) {
    throw error.message;
  }
};

FetchMoviesDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FetchMoviesDetailPage;
