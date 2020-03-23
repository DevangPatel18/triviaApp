import React from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { answerQuestion, nextQuestion } from './Actions';

const QuizQuestion = () => {
  const { state, dispatch } = React.useContext(Store);
  const { questions, answers, currentQuestion, isFaded } = state;

  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
    choices,
  } = questions[currentQuestion];

  const selection: Array<string> =
    type === 'multiple'
      ? [...incorrect_answers, correct_answer]
      : ['True', 'False'];

  const currentAnswer = answers[currentQuestion];
  const selectionStyles = selection.map(choice => {
    if (isFaded) return '';
    if (currentAnswer && choice === correct_answer) {
      return 'correct';
    } else if (currentAnswer === choice && currentAnswer !== correct_answer) {
      return 'wrong';
    }
    return '';
  });

  return (
    <div className="quizQuestion" style={{ opacity: isFaded ? 0 : 1 }}>
      <h2>{category}</h2>
      <h4>
        <em>({difficulty})</em>
      </h4>
      <p>{question}</p>
      <div className="quizQuestion_choiceGrid">
        {type === 'boolean' ? (
          <>
            {selection.map((choice, idx) => (
              <div className="quizQuestion_choiceGrid_choices" key={idx}>
                <button
                  onClick={() => {
                    if (answers.length === currentQuestion) {
                      answerQuestion(choice, dispatch);
                    }
                  }}
                  className={selectionStyles[idx]}
                >
                  {choice}
                </button>
              </div>
            ))}
          </>
        ) : (
          choices.map((index: number) => (
            <div className="quizQuestion_choiceGrid_choices" key={index}>
              <button
                onClick={() => {
                  if (answers.length === currentQuestion) {
                    answerQuestion(selection[index], dispatch);
                  }
                }}
                className={selectionStyles[index]}
              >
                {selection[index]}
              </button>
            </div>
          ))
        )}
      </div>
      {answers.length > currentQuestion && answers.length !== questions.length && (
        <button
          onClick={() => {
            if (answers.length < questions.length) nextQuestion(dispatch);
          }}
          className="button"
        >
          Next
        </button>
      )}
      {answers.length === questions.length && (
        <button
          onClick={async () => {
            await dispatch({ type: 'FADE_TOGGLE', payload: null });
            await navigate('/results');
            dispatch({ type: 'FADE_TOGGLE', payload: null });
          }}
          className="button"
        >
          Results
        </button>
      )}
    </div>
  );
};

export default QuizQuestion;
