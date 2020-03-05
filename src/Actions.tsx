import { Dispatch, IQuizConfigForm } from './interfaces';

export const fetchQuestions = async (
  formState: IQuizConfigForm,
  dispatch: Dispatch
) => {
  const queryParams = Object.entries(formState)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const fetchUrl = `https://opentdb.com/api.php?${queryParams}`;
  const response = await fetch(fetchUrl).then(res => res.json());
  if (response.response_code === 0) {
    dispatch({
      type: 'FETCH_QUESTIONS',
      payload: response.results,
    });
  }
};

export const setLoadingStatus = async (status: boolean, dispatch: Dispatch) => {
  dispatch({
    type: 'SET_LOAD_STATUS',
    payload: status,
  });
};
