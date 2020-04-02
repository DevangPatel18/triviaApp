import { Dispatch, IQuizConfigForm, IQuestionCount } from './interfaces';
import axios from 'axios';
import { navigate } from '@reach/router';

const questionsUrl = `https://opentdb.com/api.php`;
const qCountUrl = 'https://opentdb.com/api_count_global.php';
const sessionUrl = 'https://opentdb.com/api_token.php';

const delay = async (milliSeconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliSeconds));

export const fetchQuestions = async (
  formState: IQuizConfigForm,
  sessionToken: string,
  dispatch: Dispatch
) => {
  setLoadMessage('loading', dispatch);
  const response = await axios(questionsUrl, {
    params: { ...formState, token: sessionToken },
    timeout: 2000,
  })
    .then(res => res.data)
    .catch(async err => {
      console.log(err);
      clearLoadMessage(dispatch);
      await delay(500);
      await showErrorMessage(err.message, dispatch);
    });

  await delay(300);
  clearLoadMessage(dispatch);
  await delay(300);
  if (response?.response_code === 0) {
    dispatch({
      type: 'FETCH_QUESTIONS',
      payload: response.results,
    });
    dispatch({ type: 'FADE_TOGGLE', payload: null });
    await delay(500);
    await navigate('/quiz');
    dispatch({ type: 'FADE_TOGGLE', payload: null });
  } else if (response?.response_code === 4) {
    await delay(100);
    showErrorMessage('Not enough new questions for specified quiz.', dispatch);
    resetSessionToken(sessionToken, dispatch);
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
    const response = await axios(sessionUrl, {
      params: { command: 'request' },
      timeout: 2000,
    }).then(res => res.data);
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

export const resetSessionToken = (sessionToken: string, dispatch: Dispatch) => {
  axios(sessionUrl, {
    params: { command: 'reset', token: sessionToken },
    timeout: 2000,
  })
    .then(res => {
      console.log(res.data);
      if (res.data.response_code === 0) {
        const sessionTokenDate = Date.now();
        localStorage.setItem('sessionTokenDate', String(sessionTokenDate));
        dispatch({
          type: 'UPDATE_SESSION_TOKEN',
          payload: { sessionToken, sessionTokenDate },
        });
      }
    })
    .catch(err => console.log(err));
};

export const showErrorMessage = async (message: string, dispatch: Dispatch) => {
  setLoadMessage(message, dispatch);
  await delay(500);
  clearLoadMessage(dispatch);
};

export const setLoadMessage = (message: string, dispatch: Dispatch) => {
  dispatch({ type: 'ENABLE_LOAD_MESSAGE', payload: message });
};

export const clearLoadMessage = async (dispatch: Dispatch) => {
  dispatch({ type: 'DISABLE_LOAD_MESSAGE', payload: null });
  await delay(200);
  dispatch({ type: 'CLEAR_LOAD_MESSAGE', payload: null });
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
  dispatch({ type: 'FADE_TOGGLE', payload: null });
  await delay(300);
  dispatch({ type: 'NEXT_QUESTION', payload: null });
};
