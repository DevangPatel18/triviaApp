import React, { useEffect } from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';

const Results = () => {
  const { state, dispatch } = React.useContext(Store);
  const { isQuizActive, questions, answers, isFaded } = state;

  if (!isQuizActive) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    return () => {
      cancelQuiz(dispatch);
    };
  }, []);

  let correctCount = 0;
  let incorrectAnswers = [];
  const wrongAnswers = questions.filter(({ correct_answer }, idx) => {
    if (correct_answer === answers[idx]) {
      correctCount += 1;
      return false;
    }
    incorrectAnswers.push(answers[idx]);
    return true;
  });

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section className="container" style={{ opacity: isFaded ? 0 : 1 }}>
        <h2>Results</h2>
        <p>
          Score: {correctCount} / {questions.length} (
          {(100 * (correctCount / questions.length)).toFixed()}%)
        </p>
        {incorrectAnswers.length > 0 && (
          <>
            <h3>Wrong Answers</h3>
            <table className="quizResults_table">
              <thead>
                <tr>
                  <td>Question</td>
                  <td>Correct answer</td>
                  <td>Your answer</td>
                </tr>
              </thead>
              <tbody>
                {wrongAnswers.map(
                  ({ question, correct_answer, difficulty }, idx) => (
                    <tr key={idx}>
                      <td>
                        {question}{' '}
                        <span className="quizResults_table_difficulty">
                          ({difficulty.substr(0, 1)})
                        </span>
                      </td>
                      <td>{correct_answer}</td>
                      <td>{incorrectAnswers[idx]}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}
        <button
          onClick={async () => {
            await dispatch({ type: 'FADE_TOGGLE', payload: null });
            await navigate('/');
            dispatch({ type: 'FADE_TOGGLE', payload: null });
          }}
          className="button"
        >home</button>
      </section>
    </React.Suspense>
  );
};

export default Results;
