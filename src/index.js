import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

//* We could also have potentially done this in the App.js file. 
//* Used in a separate file to shield from potential deployment issues.
ReactDOM.render(<App/>, document.getElementById('root'))