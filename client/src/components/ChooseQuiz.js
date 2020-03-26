import React,  {useEffect, useContext, useState}  from 'react'
//import {Link} from "react-router-dom"
import QuizPage from "./quizPage/QuizPage.js"
import QuizContext from "../context/quiz/QuizContext.js"

const ChooseQuiz = () => {

    const quizContext = useContext(QuizContext)
    const { allQuiz } = quizContext

    const[playQuizState , setPlayQuizState]=useState(false)
    const[quiz_id, setQuiz_id]=useState(null)

    const playQuiz=(choosenQuiz)=>{
       // if(!quiz_id) return ;
        setPlayQuizState(true)
        setQuiz_id(choosenQuiz)
    }

    const backToQuizes =()=>{
        setPlayQuizState(false)
        setQuiz_id(null)
    }

    return (
        <div>
            {!playQuizState ?
            <> 
            <h2>Choose Quiz</h2>
        
            {allQuiz.map(quiz=>{
                return <div key={quiz._id}>
                            <h5>{quiz.quizTittle}</h5>
                            <button className="waves-effect waves-light btn-small" onClick={()=>playQuiz(quiz.quiz_id)}>Play
            {/* <Link to={{pathname:`/play-quiz/${quiz.quiz_id}`}} style={{color:'black'}} >Play</Link> */}
                            </button>
                        </div>
            })}
            </>
            :
            <QuizPage quiz_id={quiz_id} backToQuizes={backToQuizes}/>
        }
        </div>
    )
}

export default ChooseQuiz
