import React from 'react'
import { Store } from './Store'
import { Link } from '@reach/router'

export default function App(props: any): JSX.Element {
  const { state } = React.useContext(Store)

  return (
    <React.Fragment>
      <header>
        <h1 >Trivia App</h1>
        <Link to='/'>Home</Link>
      </header>
      {props.children}
    </React.Fragment>
  )
}
