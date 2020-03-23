import React from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';
import QuizQuestion from './QuizQuestion';
import QuizBar from './QuizBar';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);

  if (!state.isQuizActive) {
    navigate('/');
    return null;
  }

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="container">
        <QuizBar />
        <QuizQuestion />
        <button
          className="quizQuestion_cancelButton button"
          onClick={() => cancelQuiz(dispatch)}
        >
          ✖
        </button>
      </section>
    </React.Suspense>
  );
};

export default QuizPage;
