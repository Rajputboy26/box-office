import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { apiGet } from '../../Misc/Config';
import ShowGrid from './ShowGrid';

const Default = () => {
  const [shows, setShows] = useState(null);

  useEffect(() => {
    const a = [];
    while (a.length < 5) {
      const r = Math.floor(Math.random() * 1000) + 1;
      if (a.indexOf(r) === -1) {
        a.push(r);
      }
    }
    console.log(a);
    const promises = a.map(showId => apiGet(`/shows/${showId}`));
    // console.log(a);

    Promise.all(promises)
      .then(apiData => apiData.map(show => ({ show })))
      .then(results => {
        console.log(results);
        // console.log(a);
        setShows(results);
      });
  }, []);

  return <div>{shows && <ShowGrid data={shows} />}</div>;
};

export default Default;
