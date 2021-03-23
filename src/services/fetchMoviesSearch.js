import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '42e4f7e7a08186209560ab6d6e4df7d1';

const FetchMoviesSearch = async search => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
    );

    return response;
  } catch (error) {
    throw error.message;
  }
};

FetchMoviesSearch.propTypes = {
  search: PropTypes.string.isRequired,
};

export default FetchMoviesSearch;
