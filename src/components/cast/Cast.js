import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchCast from '../../services/fetchCast.js';
import Loader from 'react-loader-spinner';
import s from './Cast.module.css';
import defImg from '../../defImg';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const Cast = ({ id }) => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    async function fetchData() {
      setStatus(Status.PENDING);

      try {
        const response = await FetchCast(id);
        setActors(response.data.cast);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }
    fetchData();
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
    return (
      <ul className={s.list}>
        {actors.map(actor => (
          <li key={actors.id} className={s.item}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt="actors"
                width="100"
              ></img>
            ) : (
              <img
                className={s.defImg}
                src={defImg}
                alt="actors"
                width="100"
              ></img>
            )}
            <p className={s.title}>{actor.name}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (status === 'rejected') {
    return <div>{error}</div>;
  }
};

Cast.prototype = {
  id: PropTypes.string.isRequired,
};

export default Cast;

// class Cast extends Component {
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//   };

//   state = {
//     actors: [],
//     error: null,
//     status: Status.IDLE,
//   };

//   async componentDidMount() {
//   this.setState({
//     status: Status.PENDING,
//   });
//   const { id } = this.props;

//   try {
//     const response = await FetchCast(id);
//     this.setState({ actors: response.data.cast, status: Status.RESOLVED });
//   } catch (error) {
//     this.setState({ error, status: Status.REJECTED });
//   }
// }

//   render() {
//     const { actors, status, error } = this.state;

//   if (status === 'idle') {
//     return null;
//   }

//   if (status === 'pending') {
//     return (
//       <>
//         <Loader
//           type="Audio"
//           color="#00BFFF"
//           height={80}
//           width={200}
//           timeout={5000}
//         />
//       </>
//     );
//   }

//   if (status === 'resolved') {
//     return (
//       <ul className={s.list}>
//         {actors.map(actor => (
//           <li key={actors.id} className={s.item}>
//             {actor.profile_path ? (
//               <img
//                 src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
//                 alt="actors"
//                 width="100"
//               ></img>
//             ) : (
//               <img
//                 className={s.defImg}
//                 src={defImg}
//                 alt="actors"
//                 width="100"
//               ></img>
//             )}
//             <p className={s.title}>{actor.name}</p>
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   if (status === 'rejected') {
//     return <div>{error}</div>;
//   }
// }
// }

// export default Cast;
