import axios from 'axios';

const KEY = '42e4f7e7a08186209560ab6d6e4df7d1';

const FetchMoviesPage = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`,
    );
    return response;
  } catch (error) {
    throw error.message;
  }
};

export default FetchMoviesPage;
