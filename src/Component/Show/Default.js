import React, { useState, useEffect } from 'react';
import { apiGet } from '../../Misc/Config';
import { useShows } from '../../Misc/custom-hooks';
import ShowGrid from './ShowGrid';

const Default = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <div>
      {isLoading && <div>Shows are loading</div>}
      {error && <div>Error occured:{error}</div>}
      {!isLoading && !shows && <div>no shows here</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </div>
  );
};

export default Default;
