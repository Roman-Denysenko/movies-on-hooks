import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchReviews from '../../services/fetchReviews.js';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    async function fetchApi() {
      setStatus(Status.PENDING);
      try {
        const response = await FetchReviews(id);
        setReviews(response.data.results);
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
    if (reviews.length > 0) {
      return (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>{`Author:${review.author}`}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      );
    }

    if (reviews.length === 0) {
      return <p>There are no reviews for this film yet</p>;
    }
  }

  if (status === 'rejected') {
    return <div>{error}</div>;
  }
};

Reviews.prototype = {
  id: PropTypes.string.isRequired,
};

export default Reviews;
// class Reviews extends Component {
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//   };

//   state = {
//     reviews: [],
//     error: null,
//     status: Status.IDLE,
//   };

//   async componentDidMount() {
// this.setState({
//   status: Status.PENDING,
// });
// const { id } = this.props;
// try {
//   const response = await FetchReviews(id);
//   this.setState({
//     reviews: response.data.results,
//     status: Status.RESOLVED,
//   });
// } catch (error) {
//   this.setState({ error, status: Status.REJECTED });
// }
//   }

//   render() {
//     const { reviews, status, error } = this.state;

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
//   if (reviews.length > 0) {
//     return (
//       <ul>
//         {reviews.map(review => (
//           <li key={review.id}>
//             <p>{`Author:${review.author}`}</p>
//             <p>{review.content}</p>
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   if (reviews.length === 0) {
//     return <p>There are no reviews for this film yet</p>;
//   }
// }

// if (status === 'rejected') {
//   return <div>{error}</div>;
// }
//   }
// }

// export default Reviews;
