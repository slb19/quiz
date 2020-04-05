import React, {useContext, useState, useEffect} from 'react'
import AdminQuizItem from "./AdminQuizItem.js"
import QuizContext from "../../context/quiz/QuizContext.js"

const Quizes = () => {

    const quizContext = useContext(QuizContext)
    const {allQuiz} = quizContext;
    const[choosedQuiz, setChoosedQuiz]=useState({})

    const chooseQuiz =(quiz)=>{
        setChoosedQuiz(quiz)
    }

    return (
        <div>
            {choosedQuiz._id ? <AdminQuizItem choosedQuiz={choosedQuiz} setChoosedQuiz={setChoosedQuiz}/>
            :
            <>
             {allQuiz.map((quiz,i)=>{
                return <div key={quiz._id}>
                            <h5 style={{textDecoration:"underline", cursor:"pointer"}} className="admin-quiz-tittle" onClick={()=>chooseQuiz(quiz)}>{i+1}. {quiz.quizTittle}</h5>
                        </div>
            })}
            </>
        } 
        </div>
    )
}

export default Quizes
