import React from 'react';
import { Store } from './Store';

export default function App(props: any): JSX.Element {
  const { state } = React.useContext(Store);

  return (
    <React.Fragment>
      <header className="quizHeader">
        <h1>
          <span className="quizHeader_title">Trivia App</span>
        </h1>
      </header>
      {props.children}
    </React.Fragment>
  );
}
