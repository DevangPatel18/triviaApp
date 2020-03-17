import { Dispatch, IQuizConfigForm } from './interfaces';
import axios from 'axios';
import { navigate } from '@reach/router';

const fetchUrl = `https://opentdb.com/api.php`;

export const fetchQuestions = async (
  formState: IQuizConfigForm,
  dispatch: Dispatch
) => {
  setLoadingStatus(true, dispatch);
  const response = await axios(fetchUrl, {
    params: formState,
    timeout: 2000,
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      setLoadingStatus(false, dispatch);
    });
  if (response?.response_code === 0) {
    dispatch({
      type: 'FETCH_QUESTIONS',
      payload: response.results,
    });
    setLoadingStatus(false, dispatch);
    dispatch({ type: 'FADE_TOGGLE', payload: null });
    setTimeout(async () => {
      await navigate('/quiz');
      dispatch({ type: 'FADE_TOGGLE', payload: null });
    }, 1000);
  }
};

export const setLoadingStatus = async (status: boolean, dispatch: Dispatch) => {
  dispatch({
    type: 'SET_LOAD_STATUS',
    payload: status,
  });
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
  }, 500);
};
