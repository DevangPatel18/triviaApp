export type Dispatch = React.Dispatch<IAction>;

export interface IState {
  questions: Array<IQuestion>;
  loadStatus: boolean;
  loadMessage: string;
  answers: Array<string>;
  isQuizActive: boolean;
  currentQuestion: number;
  isFaded: boolean;
  questionCount: object;
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
  choices: Array<number>;
}

export interface IQuestionCount {
  total_num_of_questions: number;
  total_num_of_pending_questions: number;
  total_num_of_verified_questions: number;
  total_num_of_rejected_questions: number;
}
