import React from 'react';
import { Store } from './Store';
import categoryList from './categories';
import { useFormik } from 'formik';

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store);
  const formik = useFormik({
    initialValues: {
      amount: 5,
      categories: 9,
      difficulty: '',
      type: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { values, handleSubmit, handleChange } = formik;
  const { amount, difficulty, type } = values;

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <form onSubmit={handleSubmit}>
        <p>Number of Questions</p>
        <input
          type="range"
          name="amount"
          min="5"
          max="50"
          step="5"
          value={amount}
          onChange={handleChange}
        />
        <p>Categories</p>
        <select name="categories" onChange={handleChange}>
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
              checked={difficulty === ''}
              onChange={handleChange}
            />
            <label htmlFor="anyDifficulty">Any</label>
          </li>
          <li>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              id="easy"
              checked={difficulty === 'easy'}
              onChange={handleChange}
            />
            <label htmlFor="easy">Easy</label>
          </li>
          <li>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              id="medium"
              checked={difficulty === 'medium'}
              onChange={handleChange}
            />
            <label htmlFor="medium">Medium</label>
          </li>
          <li>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              id="hard"
              checked={difficulty === 'hard'}
              onChange={handleChange}
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
              checked={type === ''}
              onChange={handleChange}
            />
            <label htmlFor="anyType">Any</label>
          </li>
          <li>
            <input
              type="radio"
              name="type"
              value="multiple"
              id="multiple"
              checked={type === 'multiple'}
              onChange={handleChange}
            />
            <label htmlFor="multiple">Multiple</label>
          </li>
          <li>
            <input
              type="radio"
              name="type"
              value="boolean"
              id="boolean"
              checked={type === 'boolean'}
              onChange={handleChange}
            />
            <label htmlFor="boolean">Boolean</label>
          </li>
        </ul>
        <button type="submit">Start Quiz</button>
      </form>
    </React.Suspense>
  );
};

export default HomePage;
