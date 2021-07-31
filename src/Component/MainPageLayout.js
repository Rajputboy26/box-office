import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box Office"
        by="By Surya"
        subtitle="Are you looking for a Show or Actor"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
