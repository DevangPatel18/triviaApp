import React from 'react';
import { IState, IAction } from './interfaces';

const initialState: IState = {
  questions: [],
  loadStatus: false,
  answers: [],
  isQuizActive: false,
  currentQuestion: 0,
  isFaded: false,
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'FETCH_QUESTIONS':
      action.payload.forEach(obj => {
        if (obj.type === 'multiple') {
          const indexes = [0, 1, 2, 3];
          for (let i = indexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
          }
          obj.choices = indexes;
        } else {
          obj.choices = [];
        }
      });
      return {
        ...state,
        questions: action.payload,
        isQuizActive: true,
        answers: [],
      };
    case 'SET_LOAD_STATUS':
      return { ...state, loadStatus: action.payload };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        isFaded: false,
      };
    case 'CANCEL_QUIZ':
      return {
        ...state,
        questions: [],
        isQuizActive: false,
        currentQuestion: 0,
      };
      0;
    case 'FADE_OUT':
      return { ...state, isFaded: true };
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
