import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StoreProvider } from './Store'
import { Router, RouteComponentProps } from '@reach/router'
import HomePage from './HomePage'
import QuizPage from './QuizPage'
require('./style.sass')
require('normalize.css')

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent

ReactDOM.render(
  <StoreProvider>
    <Router >
      <App path='/'>
        <RouterPage pageComponent={<HomePage />} path='/' />
        <RouterPage pageComponent={<QuizPage />} path='/quiz' />
      </App>
    </Router >
  </StoreProvider>,
  document.getElementById('app-root')
)
