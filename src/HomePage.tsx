import React from 'react';
import { Store } from './Store'

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store)

  return (
    <React.Suspense fallback={<div>loading</div>}>
      home page content
    </React.Suspense>
  );
};

export default HomePage;
