import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);

  if (!state.isQuizActive) {
    navigate('/');
  }

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="quizQuestion container">
        <button
          className="quizQuestion_cancelButton"
          onClick={() => cancelQuiz(dispatch)}
        >
          ✖
        </button>
      </section>
    </React.Suspense>
  );
};

export default QuizPage;
