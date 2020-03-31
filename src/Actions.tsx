import { Dispatch, IQuizConfigForm, IQuestionCount } from './interfaces';
import axios from 'axios';
import { navigate } from '@reach/router';

const CLEAR_MESSAGE_DURATION = 500;
const ERROR_MESSAGE_DURATION = 500;
const questionsUrl = `https://opentdb.com/api.php`;
const qCountUrl = 'https://opentdb.com/api_count_global.php';
const sessionUrl = 'https://opentdb.com/api_token.php?command=request';

export const fetchQuestions = async (
  formState: IQuizConfigForm,
  dispatch: Dispatch
) => {
  setLoadMessage('loading', dispatch);
  const response = await axios(questionsUrl, {
    params: formState,
    timeout: 2000,
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      clearLoadMessage(dispatch);
      showErrorMessage(err.message, dispatch);
    });

  clearLoadMessage(dispatch);
  if (response?.response_code === 0) {
    dispatch({
      type: 'FETCH_QUESTIONS',
      payload: response.results,
    });
    setTimeout(() => {
      dispatch({ type: 'FADE_TOGGLE', payload: null });
      setTimeout(async () => {
        await navigate('/quiz');
        dispatch({ type: 'FADE_TOGGLE', payload: null });
      }, ERROR_MESSAGE_DURATION);
    }, CLEAR_MESSAGE_DURATION);
  } else if (response?.response_code === 1) {
    showErrorMessage('Not enough questions for specified quiz.', dispatch);
  }
};

export const fetchQuestionCount = async (dispatch: Dispatch) => {
  const response = await axios(qCountUrl, { timeout: 2000 })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
  const questionCountObj = Object.entries(response?.categories).reduce(
    (acc: object, [key, value]: [string, IQuestionCount]) => ({
      ...acc,
      [key]: value?.total_num_of_verified_questions,
    }),
    {}
  );

  dispatch({
    type: 'UPDATE_QUESTION_COUNT',
    payload: questionCountObj,
  });
};

export const fetchSessionToken = async (dispatch: Dispatch) => {
  let sessionToken = localStorage.getItem('sessionToken');
  let sessionTokenDate = parseInt(localStorage.getItem('sessionTokenDate'));
  if (!sessionToken || Date.now() - sessionTokenDate > 21.6e6) {
    const response = await axios(sessionUrl).then(res => res.data);
    if (response.response_code === 0) {
      sessionToken = response.token;
      sessionTokenDate = Date.now();
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('sessionTokenDate', String(sessionTokenDate));
    } else return;
  }
  dispatch({
    type: 'UPDATE_SESSION_TOKEN',
    payload: { sessionToken, sessionTokenDate },
  });
};

export const showErrorMessage = (message: string, dispatch: Dispatch) => {
  setTimeout(() => {
    setLoadMessage(message, dispatch);
    setTimeout(() => {
      clearLoadMessage(dispatch);
    }, ERROR_MESSAGE_DURATION);
  }, CLEAR_MESSAGE_DURATION);
};

export const setLoadMessage = (message: string, dispatch: Dispatch) => {
  dispatch({ type: 'ENABLE_LOAD_MESSAGE', payload: message });
};

export const clearLoadMessage = (dispatch: Dispatch) => {
  dispatch({ type: 'DISABLE_LOAD_MESSAGE', payload: null });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_LOAD_MESSAGE', payload: null });
  }, 200);
};

export const cancelQuiz = async (dispatch: Dispatch) => {
  dispatch({ type: 'CANCEL_QUIZ', payload: null });
};

export const answerQuestion = async (answer: string, dispatch: Dispatch) => {
  dispatch({
    type: 'ANSWER_QUESTION',
    payload: answer,
  });
};

export const nextQuestion = async (dispatch: Dispatch) => {
  await dispatch({ type: 'FADE_TOGGLE', payload: null });
  setTimeout(() => {
    dispatch({
      type: 'NEXT_QUESTION',
      payload: null,
    });
  }, 300);
};
