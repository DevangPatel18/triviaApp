import { initialState, reducer } from '../Store';
import sampleQuiz from '../sampleQuiz';

describe('Store reducer', () => {
  it('Sets load status', () => {
    const state_a = reducer(
      { ...initialState, loadStatus: true },
      { type: 'SET_LOAD_STATUS', payload: false }
    );
    expect(state_a.loadStatus).toBeFalsy();

    const state_b = reducer(
      { ...initialState, loadStatus: false },
      { type: 'SET_LOAD_STATUS', payload: true }
    );
    expect(state_b.loadStatus).toBeTruthy();
  });

  it('Toggles fade property', () => {
    const state_a = reducer(
      { ...initialState, isFaded: true },
      { type: 'FADE_TOGGLE', payload: null }
    );
    expect(state_a.isFaded).toBeFalsy();

    const state_b = reducer(
      { ...initialState, isFaded: false },
      { type: 'FADE_TOGGLE', payload: null }
    );
    expect(state_b.isFaded).toBeTruthy();
  });

  it('Fetches quiz questions', () => {
    const state_a = reducer(
      { ...initialState },
      { type: 'FETCH_QUESTIONS', payload: sampleQuiz }
    );

    expect(state_a.questions).toHaveLength(sampleQuiz.length);

    state_a.questions.forEach(question => {
      expect(question.choices).toEqual(expect.arrayContaining([0, 1, 2, 3]));
    });

    expect(state_a.isQuizActive).toBeTruthy();
    expect(state_a.answers).toHaveLength(0);
  });
});
