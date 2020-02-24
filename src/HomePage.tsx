import React from 'react';
import { Store } from './Store'
import categories from './categories'

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store)

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <form>
        <p>Number of Questions</p>
        <input type="range" name="amount" min="5" max="50" step="5" />
        <p>Categories</p>
        <select name="categories">
          {categories.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
        </select>
        <p>Difficulty</p>
        <ul>
          <li>
            <input type="radio" name="difficulty" value="" id="anyDifficulty" />
            <label htmlFor="anyDifficulty">Any</label>
          </li>
          <li>
            <input type="radio" name="difficulty" value="easy" id="easy" />
            <label htmlFor="easy">Easy</label>
          </li>
          <li>
            <input type="radio" name="difficulty" value="medium" id="medium" />
            <label htmlFor="medium">Medium</label>
          </li>
          <li>
            <input type="radio" name="difficulty" value="hard" id="hard" />
            <label htmlFor="hard">Hard</label>
          </li>
        </ul>
        <p>Type</p>
        <ul>
          <li>
            <input type="radio" name="type" value="" id="anyType" />
            <label htmlFor="anyType">Any</label>
          </li>
          <li>
            <input type="radio" name="type" value="multiple" id="multiple" />
            <label htmlFor="multiple">Multiple</label>
          </li>
          <li>
            <input type="radio" name="type" value="boolean" id="boolean" />
            <label htmlFor="boolean">Boolean</label>
          </li>
        </ul>
        <button type="submit">Start Quiz</button>
      </form>
    </React.Suspense >
  );
};

export default HomePage;
