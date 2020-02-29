export type Dispatch = React.Dispatch<IAction>;

export interface IState {}

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
