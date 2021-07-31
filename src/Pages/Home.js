import React, { useState } from 'react';
import ActorGrid from '../Component/Actor/ActorGrid';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Show/ShowGrid';
import Default from '../Component/Show/Default';
import { apiGet } from '../Misc/Config';
import { useLastQuery } from '../Misc/custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      //   console.log(result);
    });
  };
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  //   console.log(searchOption);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No Result</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return <Default />;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search Shows"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actor-search">
          Actors
          <input
            id="actor-search"
            type="radio"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
