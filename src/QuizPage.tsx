import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';
import { decode } from 'he';

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

  let selection = [...incorrect_answers, correct_answer].map(decode);

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
        <p>{decode(question)}</p>
        <div className="quizQuestion_choiceGrid">
          {type === 'boolean' ? (
            <>
              <div className="quizQuestion_choiceGrid_choices">
                <button>True</button>
              </div>
              <div className="quizQuestion_choiceGrid_choices">
                <button>False</button>
              </div>
            </>
          ) : (
            selection.map((choice, idx) => (
              <div className="quizQuestion_choiceGrid_choices" key={idx}>
                <button>{choice}</button>
              </div>
            ))
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
