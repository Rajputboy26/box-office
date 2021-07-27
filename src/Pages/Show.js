/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../Misc/Config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  //   console.log(show);

  if (isLoading) {
    return <div>data is loading</div>;
  }
  if (error) {
    return <div>Error occured:{error}</div>;
  }
  return <div>hi surya</div>;
};

export default Show;
