import React from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { decode } from 'he';

const Results = () => {
  const { state } = React.useContext(Store);
  const { isQuizActive } = state;

  if (!isQuizActive) {
    navigate('/');
    return null;
  }

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="quizQuestion container">
        <h2>Results</h2>
      </section>
    </React.Suspense>
  );
};

export default Results;
