import React, {useEffect, useContext} from 'react';
import {BrowserRouter as Router ,Route,Switch, Redirect} from "react-router-dom";
import LandingPage from "./components/LandingPage.js"
import ChooseQuiz from "./components/ChooseQuiz.js"
import QuizPage from "./components/quizPage/QuizPage.js"
import NotFoundPage from "./components/NotFoundPage.js"

import QuizContext from "./context/quiz/QuizContext.js"
import "materialize-css/dist/css/materialize.min.css"
import './App.css';

function App() {

   const quizContext = useContext(QuizContext)
   const {getAllQuiz} = quizContext

   useEffect(()=>{
     getAllQuiz()
 },[])

  return (
    <div className="container">
      
      <Router>
          <Switch>
            
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/choose-quiz" component={ChooseQuiz}/>
              {/*<Route exact path="/play-quiz/:quiz_id" component={QuizPage}/>*/}
              <Route component={NotFoundPage} />
            
          </Switch>
      </Router>
     
    </div>
  );
}

export default App;


