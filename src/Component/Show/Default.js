import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';
import { apiGet } from '../../Misc/Config';
import ShowGrid from './ShowGrid';

const Default = () => {
  const [shows, setShows] = useState('');

  useEffect(() => {
    const a = [];
    // console.log(a);
    while (a.length < 5) {
      const r = Math.floor(Math.random() * 10000) + 1;
      if (a.indexOf(r) === -1) {
        a.push(r);
      }
    }
    // console.log(a);

    const promises = a.map(showId => apiGet(`/shows/${showId}`));

    Promise.all(promises)
      .then(apiData => apiData.map(show => ({ show })))
      .then(results => {
        // console.log(results);
        setShows(results);
      });
  }, []);
  for (let i = 0; i < 5; i++) {
    if (shows[i]) {
      // console.log(shows);
      const ob = Object.values(shows[i]);
      // console.log(ob[0].id);
      // console.log(ob);
      if (ob[0].id) {
        return <div>{shows && <ShowGrid data={shows} />}</div>;
      }
    }
  }
  return null;
  // return <div>{shows && <ShowGrid data={shows} />}</div>;
};

export default Default;
