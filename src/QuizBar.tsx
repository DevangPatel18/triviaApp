import React from 'react';
import { Store } from './Store';

const QuizBar = () => {
  const { state } = React.useContext(Store);
  const { questions, answers } = state;

  const percentage = (100 * (answers.length / questions.length)).toFixed();

  return (
    <nav>
      <div className="quizProgressbar">
        <span
          style={{
            width: `${percentage}%`,
          }}
          className="quizProgressbar_fill"
        >
          {`${percentage}%`}
        </span>
      </div>
    </nav>
  );
};

export default QuizBar;
