import React from 'react'

const AdminQuizQuestion = ({choosedQuiz, showQuizQuestion, setShowQuizQuestion}) => {

    const{index} = showQuizQuestion

    return (
        <div>
             <h5>Question</h5>
                <p style={{marginLeft:"30px"}} >{choosedQuiz.question[index]}</p>
                   <div style={{marginLeft:"60px"}}>
                    <h5>Multiple choise</h5>
                    <ul style={{marginLeft:"30px"}}>
                        {
                         choosedQuiz.multipleChoise[index].choises.map((ch, i)=>{
                            return <li key={ i }>{ ch }</li>
                         })
                        }
                    </ul>
                        <h5>Answer</h5>
                            <p style={{marginLeft:"30px"}}>{choosedQuiz.answer[index]}</p>
                   </div>
                <button onClick={()=>{setShowQuizQuestion({ isOn:false, index:null })}}>Back to quiz tittle</button>
        </div>
    )
}

export default AdminQuizQuestion
