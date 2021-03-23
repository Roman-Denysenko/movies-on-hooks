import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '42e4f7e7a08186209560ab6d6e4df7d1';

const FetchReviews = async id => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`,
    );
    return response;
  } catch (error) {
    throw error.message;
  }
};

FetchReviews.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FetchReviews;
