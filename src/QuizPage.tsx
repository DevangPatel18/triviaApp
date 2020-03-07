import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="quizMenu">
        Quiz question
      </section>
    </React.Suspense>
  );
};

export default QuizPage;
