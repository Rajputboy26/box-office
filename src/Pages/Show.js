import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../Component/Show/Cast';
import Details from '../Component/Show/Details';
import Seasons from '../Component/Show/Seasons';
import ShowMainData from '../Component/Show/ShowMainData';
import { useShow } from '../Misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

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
