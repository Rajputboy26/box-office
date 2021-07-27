import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../Component/Show/Cast';
import Details from '../Component/Show/Details';
import Seasons from '../Component/Show/Seasons';
import ShowMainData from '../Component/Show/ShowMainData';
import { apiGet } from '../Misc/Config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED':
      return { ...prevState, isLoading: false, error: action.error };
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', Error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // console.log(show);
  // console.log(isLoading);

  if (isLoading) {
    return <div>data is loading</div>;
  }
  if (error) {
    return <div>Error occured:{error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
        </h2>
      </InfoBlock>
      <InfoBlock>
        <h2>
          <Seasons seasons={show._embedded.seasons} />
        </h2>
      </InfoBlock>
      <InfoBlock>
        <h2>
          <Cast cast={show._embedded.cast} />
        </h2>
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
