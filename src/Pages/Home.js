import React, { useState, useCallback } from 'react';
import ActorGrid from '../Component/Actor/ActorGrid';
import MainPageLayout from '../Component/MainPageLayout';
import ShowGrid from '../Component/Show/ShowGrid';
import Default from '../Component/Show/Default';
import { apiGet } from '../Misc/Config';
import { useLastQuery, useLastResult } from '../Misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../Component/CustomRadio';

const renderResult = results => {
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

const Home = () => {
  const [input, setInput] = useLastQuery('');
  const [results, setResults] = useLastResult(null);
  // const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search Shows"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actor-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult(results)}
    </MainPageLayout>
  );
};

export default Home;
