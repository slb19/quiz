import React, {useEffect, useContext} from 'react';
import {BrowserRouter as Router ,Route,Switch, Redirect} from "react-router-dom";
import LandingPage from "./components/LandingPage.js"
import ChooseQuiz from "./components/ChooseQuiz.js"
//import QuizPage from "./components/quizPage/QuizPage.js"
import Login from "./components/admin/Login.js"
import AdminDashboard from "./components/admin/AdminDashboard.js"
import NotFoundPage from "./components/NotFoundPage.js"
import AuthContext from "./context/auth/AuthContext.js"
import QuizContext from "./context/quiz/QuizContext.js"
import "materialize-css/dist/css/materialize.min.css"
// eslint-disable-next-line 
import M from "materialize-css/dist/js/materialize.min.js"
import './App.css';

function App() {

   const quizContext = useContext(QuizContext)
   const {getAllQuiz} = quizContext

   const authContext = useContext(AuthContext)
   const { auth , token} = authContext

   useEffect(()=>{
     getAllQuiz()
     // eslint-disable-next-line 
 },[])

  return (
    <div className="container">
      
      <Router>
          <Switch>
            
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/choose-quiz" component={ChooseQuiz}/>
              {/*<Route exact path="/play-quiz/:quiz_id" component={QuizPage}/>*/}
              <Route exact path="/admin" component={Login} />
              {/*<Route exact path="/admin-dashboard" component={AdminDashboard} />*/}
              <Route exact path="/admin-dashboard">
                {!auth || !token ? <Redirect to="/admin" /> : <AdminDashboard />}
              </Route>
              <Route component={NotFoundPage} />
            
          </Switch>
      </Router>
     
    </div>
  );
}

export default App;
/*
<Route exact path="/admin-dashboard">
{!auth || !token ? <Redirect to="/admin" /> : <AdminDashboard />}
</Route>
*/
