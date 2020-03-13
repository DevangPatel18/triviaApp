import React from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { decode } from 'he';

const Results = () => {
  const { state } = React.useContext(Store);
  const { isQuizActive, questions, answers } = state;

  if (!isQuizActive) {
    navigate('/');
    return null;
  }

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
      <section className="container">
        <h2>Results</h2>
        <p>
          Score: {correctCount} / {questions.length} (
          {(correctCount / questions.length) * 100}%)
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
                        {decode(question)}{' '}
                        <span className="quizResults_table_difficulty">
                          ({difficulty.substr(0, 1)})
                        </span>
                      </td>
                      <td>{decode(correct_answer)}</td>
                      <td>{decode(incorrectAnswers[idx])}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}
      </section>
    </React.Suspense>
  );
};

export default Results;
