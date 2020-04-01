import React, { useEffect } from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';
import {
  fetchQuestions,
  fetchQuestionCount,
  fetchSessionToken,
} from './Actions';
import { IQuizConfigForm } from './interfaces';
import { useTransition, animated } from 'react-spring';

const difficultyOptions = [
  { value: '', id: 'anyDifficulty', label: 'Any' },
  { value: 'easy', id: 'easy', label: 'Easy' },
  { value: 'medium', id: 'medium', label: 'Medium' },
  { value: 'hard', id: 'hard', label: 'Hard' },
];

const typeOptions = [
  { value: '', id: 'anyType', label: 'Any' },
  { value: 'multiple', id: 'multiple', label: 'Multiple' },
  { value: 'boolean', id: 'boolean', label: 'True / False' },
];

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store);
  const initialValues: IQuizConfigForm = {
    amount: 5,
    category: 9,
    difficulty: '',
    type: '',
  };

  useEffect(() => {
    fetchQuestionCount(dispatch);
    fetchSessionToken(dispatch);
  }, []);

  const transitions = useTransition(state.loadStatus, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const emptyQuestionCount = Object.keys(state.questionCount).length === 0;

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <section
        className="quizQuestion container"
        style={{ opacity: state.isFaded ? 0 : 1 }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            fetchQuestions(values, state.sessionToken, dispatch);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <h3>Categories</h3>
              <select name="category" onChange={props.handleChange}>
                {categoryList.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                    {emptyQuestionCount ? '' : ` (${state.questionCount[id]})`}
                  </option>
                ))}
              </select>
              <div className="quizMenu-radioGroup">
                <div>
                  <h3>Difficulty</h3>
                  <ul>
                    {difficultyOptions.map(({ value, id, label }, idx) => (
                      <li key={idx}>
                        <input
                          type="radio"
                          name="difficulty"
                          value={value}
                          id={id}
                          checked={props.values.difficulty === value}
                          onChange={props.handleChange}
                        />
                        <label htmlFor={id}>{label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Type</h3>
                  <ul>
                    {typeOptions.map(({ value, id, label }, idx) => (
                      <li key={idx}>
                        <input
                          type="radio"
                          name="type"
                          value={value}
                          id={id}
                          checked={props.values.type === value}
                          onChange={props.handleChange}
                        />
                        <label htmlFor={id}>{label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="quizMenu_count">
                <h3>Number of Questions</h3>
                <p>{props.values.amount}</p>
                <input
                  type="range"
                  name="amount"
                  min="1"
                  max="50"
                  step="1"
                  value={props.values.amount}
                  onChange={props.handleChange}
                  className="quizMenu_count_slider"
                />
              </div>
              <button type="submit" className="button">
                Start Quiz
              </button>
            </form>
          )}
        />
        <div style={{ margin: '3rem 0 auto', textAlign: 'center' }}>
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div style={props} key={key}>
                  {state.loadMessage}
                </animated.div>
              )
          )}
        </div>
      </section>
    </React.Suspense>
  );
};

export default HomePage;
