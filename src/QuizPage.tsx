import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';
import { navigate } from '@reach/router';
import { cancelQuiz, answerQuestion, nextQuestion } from './Actions';
import { decode } from 'he';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);
  const { isQuizActive, questions, answers, currentQuestion, isFaded } = state;

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
    choices,
  } = questions[currentQuestion];

  const selection: Array<string> = [...incorrect_answers, correct_answer].map(
    decode
  );

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
    <React.Suspense fallback={<div>loading</div>}>
      <section
        className="quizQuestion container"
        style={{ opacity: isFaded ? 0 : 1 }}
      >
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
        {answers.length > currentQuestion && (
          <button
            onClick={() => {
              if (answers.length < questions.length) nextQuestion(dispatch);
            }}
            className="quizQuestion_nextButton"
          >
            Next
          </button>
        )}
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
