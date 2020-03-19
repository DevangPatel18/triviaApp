import { Dispatch, IQuizConfigForm, IQuestionCount } from './interfaces';
import axios from 'axios';
import { navigate } from '@reach/router';

const questionsUrl = `https://opentdb.com/api.php`;
const qCountUrl = 'https://opentdb.com/api_count_global.php';

export const fetchQuestions = async (
  formState: IQuizConfigForm,
  dispatch: Dispatch
) => {
  setLoadingStatus(true, dispatch);
  const response = await axios(questionsUrl, {
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
  }, 300);
};
