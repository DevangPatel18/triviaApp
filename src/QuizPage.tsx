import React from 'react';
import { Store } from './Store';
import { navigate } from '@reach/router';
import { cancelQuiz } from './Actions';
import QuizQuestion from './QuizQuestion';
import QuizBar from './QuizBar';

const QuizPage = () => {
  const { state, dispatch } = React.useContext(Store);
  const [isDialogOpen, setDialogView] = React.useState(false);

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
          onClick={() => setDialogView(true)}
        >
          ✖
        </button>

        <div
          className="quizQuestion_cancelDialog"
          style={{
            zIndex: isDialogOpen ? 5 : -1,
            opacity: isDialogOpen ? '1' : '0',
          }}
        >
          <div className="quizQuestion_cancelDialog_message">
            <p>Are you sure you want to cancel the quiz?</p>
            <button className="button" onClick={() => cancelQuiz(dispatch)}>
              Yes
            </button>
            <button className="button" onClick={() => setDialogView(false)}>
              No
            </button>
          </div>
        </div>
      </section>
    </React.Suspense>
  );
};

export default QuizPage;
