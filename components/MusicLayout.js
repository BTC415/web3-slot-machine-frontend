import React from 'react';
import BackgroundMusic from '../components/BackgroundMusic';

const MusicLayout = ({children }) => {
  return (
    <>
      <BackgroundMusic />
      <main>{children}</main>
      {/* Rest of your layout */}
    </>
  );
};

export default MusicLayout;