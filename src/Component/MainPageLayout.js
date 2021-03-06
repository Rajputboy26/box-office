import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box Office"
        by="By Surjeet Singh"
        subtitle="Are you looking for a Web-Show or Actor"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
