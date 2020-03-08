import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);
  const { isQuizActive, questions, currentQuestion } = state;

  if (!isQuizActive) {
    navigate('/');
    return null;
  }

  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = questions[currentQuestion];

  let selection = [...incorrect_answers, correct_answer];

  for (let i = selection.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selection[i], selection[j]] = [selection[j], selection[i]];
  }

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="quizQuestion container">
        <h2>{category}</h2>
        <h4>
          <em>({difficulty})</em>
        </h4>
        <p>{question}</p>
        <div>
          {type === 'boolean' ? (
            <>
              <button>True</button>
              <button>False</button>
            </>
          ) : (
            selection.map((choice, idx) => <button key={idx}>{choice}</button>)
          )}
        </div>
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
