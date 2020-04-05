import React from 'react'


const AdminQuizItem = ({choosedQuiz, setChoosedQuiz}) => {

    return (
        <div>
            <h4>Quiz tittle</h4>
                <p>{choosedQuiz.quizTittle}</p>
            <h5>Questions</h5>
                {choosedQuiz.question.map((question, i)=>{
                    return <p key={i} style={{textDecoration:"underline", cursor:"pointer"}} >{i+1}. {question}</p>
                })}
                <button onClick={()=>{ setChoosedQuiz({}) }}>back</button>
        </div>
    )
}

export default AdminQuizItem
