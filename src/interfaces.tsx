export type Dispatch = React.Dispatch<IAction>;

export interface IState {
  questions: Array<IQuestion>;
  loadStatus: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IQuizConfigForm {
  amount: number;
  category: number;
  difficulty: string;
  type: string;
}

export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}
