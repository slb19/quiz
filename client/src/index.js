import React from 'react';
import ReactDOM from 'react-dom';
import QuizState from "./context/quiz/QuizState.js"
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <QuizState>
        <App />
    </QuizState>
  </React.StrictMode>,
  document.getElementById('root')
);


