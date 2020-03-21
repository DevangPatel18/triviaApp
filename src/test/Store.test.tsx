import { initialState, reducer } from '../Store';

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
});
