import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StoreProvider } from './Store'
import { Router, RouteComponentProps } from '@reach/router'
import HomePage from './HomePage'
require('./style.sass')
require('normalize.css')

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) =>
  props.pageComponent

ReactDOM.render(
  <StoreProvider>
    <Router >
      <App path='/'>
        <RouterPage pageComponent={<HomePage />} path='/' />
      </App>
    </Router >
  </StoreProvider>,
  document.getElementById('app-root')
)
