import React from 'react';
import { TitleWrapper } from './Title.styled';

const Title = ({ title, subtitle, by }) => {
  return (
    <TitleWrapper>
      <h1 style={{ marginBottom: 0 }}>{title}</h1>
      <p
        style={{
          fontWeight: 'lighter',
          marginTop: 0,
          fontSize: 'medium',
          color: 'blue',
        }}
      >
        {by}
      </p>
      <p style={{ fontWeight: 'lighter', marginTop: 10, fontSize: 'small' }}>
        {subtitle}
      </p>
    </TitleWrapper>
  );
};

export default Title;
