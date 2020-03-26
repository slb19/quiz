import React,  {useEffect, useContext}  from 'react'
import {Link} from "react-router-dom"
import QuizContext from "../context/quiz/QuizContext.js"

const ChooseQuiz = () => {

    const quizContext = useContext(QuizContext)
    const { allQuiz } = quizContext

    return (
        <div>
            <h2>Choose Quiz</h2>
            {allQuiz.map(quiz=>{
                return <div key={quiz._id}>
                            <h5>{quiz.quizTittle}</h5>
                            <button className="waves-effect waves-light btn-small">
                                <Link to={{pathname:`/play-quiz/${quiz.quiz_id}`}} style={{color:'black'}} >Play</Link>
                            </button>
                        </div>
            })}
        </div>
    )
}

export default ChooseQuiz
