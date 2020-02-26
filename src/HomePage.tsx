import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { Formik } from 'formik';

interface QuizConfigForm {
  amount: number;
  categories: number;
  difficulty: string;
  type: string;
}

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store);
  const initialValues: QuizConfigForm = {
    amount: 5,
    categories: 9,
    difficulty: '',
    type: '',
  };

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <p>Number of Questions</p>
            <input
              type="range"
              name="amount"
              min="5"
              max="50"
              step="5"
              value={props.values.amount}
              onChange={props.handleChange}
            />
            <p>Categories</p>
            <select name="categories" onChange={props.handleChange}>
              {categoryList.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <p>Difficulty</p>
            <ul>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  value=""
                  id="anyDifficulty"
                  checked={props.values.difficulty === ''}
                  onChange={props.handleChange}
                />
                <label htmlFor="anyDifficulty">Any</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  id="easy"
                  checked={props.values.difficulty === 'easy'}
                  onChange={props.handleChange}
                />
                <label htmlFor="easy">Easy</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  id="medium"
                  checked={props.values.difficulty === 'medium'}
                  onChange={props.handleChange}
                />
                <label htmlFor="medium">Medium</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  id="hard"
                  checked={props.values.difficulty === 'hard'}
                  onChange={props.handleChange}
                />
                <label htmlFor="hard">Hard</label>
              </li>
            </ul>
            <p>Type</p>
            <ul>
              <li>
                <input
                  type="radio"
                  name="type"
                  value=""
                  id="anyType"
                  checked={props.values.type === ''}
                  onChange={props.handleChange}
                />
                <label htmlFor="anyType">Any</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="type"
                  value="multiple"
                  id="multiple"
                  checked={props.values.type === 'multiple'}
                  onChange={props.handleChange}
                />
                <label htmlFor="multiple">Multiple</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="type"
                  value="boolean"
                  id="boolean"
                  checked={props.values.type === 'boolean'}
                  onChange={props.handleChange}
                />
                <label htmlFor="boolean">Boolean</label>
              </li>
            </ul>
            <button type="submit">Start Quiz</button>
          </form>
        )}
      />
    </React.Suspense>
  );
};

export default HomePage;
