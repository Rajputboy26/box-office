import React, { useState, useEffect } from 'react';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Show/ShowGrid';
import { apiGet } from '../Misc/Config';
import { useShows } from '../Misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();
  // console.log(starred);

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      // console.log(promises);

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          // console.log(results);

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
    <MainPageLayout>
      {isLoading && (
        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
          Shows are loading
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
          Error occured:{error}
        </div>
      )}
      {!isLoading && !shows && (
        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
          No Shows here
        </div>
      )}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
