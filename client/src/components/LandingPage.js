import React, {useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
//import QuizContext from "../context/quiz/QuizContext.js"

const LandingPage = () => {

    return (
        <div className="center-align landing-button">
            <button className="waves-effect waves-light btn-large" >
                <Link to="/choose-quiz" style={{color:'black'}}>
                    Go to Quiz
                </Link>   
            </button>
        </div>
    )
}

export default LandingPage
