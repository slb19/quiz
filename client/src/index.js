import React from 'react';
import ReactDOM from 'react-dom';
import QuizState from "./context/quiz/QuizState.js"
import AuthState from "./context/auth/AuthState.js"
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <AuthState>
    <QuizState>
        <App />
    </QuizState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);


