import React from 'react';
import { IState, IAction } from './interfaces';

const initialState: IState = {
  questions: [],
  loadStatus: false,
  answers: [],
  isQuizActive: false,
  currentQuestion: 0,
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'FETCH_QUESTIONS':
      return { ...state, questions: action.payload, isQuizActive: true };
    case 'SET_LOAD_STATUS':
      return { ...state, loadStatus: action.payload };
    case 'CANCEL_QUIZ':
      return {
        ...state,
        questions: [],
        isQuizActive: false,
        currentQuestion: 0,
      };
    default:
      return state;
  }
}

export function StoreProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
