import React, {useState} from 'react'
import AdminQuizQuestion from "./AdminQuizQuestion.js"

const AdminQuizItem = ({choosedQuiz, setChoosedQuiz}) => {

    const[showQuizQuestion, setShowQuizQuestion] = useState({
        isOn:false,
        index:null
    })


    return (
        <div>
           { showQuizQuestion.isOn ? <AdminQuizQuestion choosedQuiz={choosedQuiz} showQuizQuestion={showQuizQuestion} setShowQuizQuestion={setShowQuizQuestion} />
                    :
                <>       
                    <h4>Quiz tittle</h4>
                        <p style={{marginLeft:"30px"}}>{choosedQuiz.quizTittle}</p>
                    <h5>Questions</h5>
                        {choosedQuiz.question.map((question, i)=>{
                            return <p key={i} style={{textDecoration:"underline", cursor:"pointer", marginLeft:"30px" }} onClick={()=>{setShowQuizQuestion({ isOn:true , index: i })}}>{i+1}. {question}</p>     
                        })}
                    <button onClick={()=>{ setChoosedQuiz({}) }}>back To All quizes</button>
                </>
            }  
        </div>
    )
}

export default AdminQuizItem
