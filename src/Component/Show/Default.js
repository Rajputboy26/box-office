import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { apiGet } from '../../Misc/Config';
import ShowGrid from './ShowGrid';

const Default = () => {
  const [shows, setShows] = useState('');

  useEffect(() => {
    const a = [];
    while (a.length < 5) {
      const r = Math.floor(Math.random() * 1000) + 1;
      if (a.indexOf(r) === -1) {
        a.push(r);
      }
    }

    const promises = a.map(showId => apiGet(`/shows/${showId}`));

    Promise.all(promises)
      .then(apiData => apiData.map(show => ({ show })))
      .then(results => {
        console.log(results);
        setShows(results);
      });
  }, []);
  // console.log(shows);

  return <div>{shows && <ShowGrid data={shows} />}</div>;
};

export default Default;
