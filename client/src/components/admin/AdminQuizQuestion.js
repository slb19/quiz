import React,{useState} from 'react'

const AdminQuizQuestion = ({choosedQuiz, setChoosedQuiz, showQuizQuestion, setShowQuizQuestion, sendUpdateToServer, cancelUpdate}) => {

    const[editQuestionMultipleChoise, setEditQuestionMultipleChoise] = useState(false)

    const{index} = showQuizQuestion

    const updateQuestionMultipleChoise =(e,i)=>{
        const choosedQuizCopy = choosedQuiz
        if(e.target.name === "multipleChoise"){
            choosedQuizCopy.multipleChoise[index].choises[i] = e.target.value
            setChoosedQuiz({...choosedQuiz, multipleChoise:choosedQuizCopy.multipleChoise})
        }     
        if(e.target.name === "answer"){
            choosedQuizCopy.answer[index] = e.target.value
            setChoosedQuiz({...choosedQuiz, answer:choosedQuizCopy.answer})
        }
    }

    const sendUpdateToServerMultipleChoise = ()=>{
        setEditQuestionMultipleChoise(false)
        sendUpdateToServer()
    }

    const cancelUpdateMultipleChoise= ()=>{
        setEditQuestionMultipleChoise(false)
        cancelUpdate()
    }

    return (
        <div>
             <h5>Question</h5>
                <p style={{marginLeft:"30px"}} >{choosedQuiz.question[index]}</p>
                   <div style={{marginLeft:"60px"}}>
                    <h5>Multiple choise</h5>
                    <ul style={{marginLeft:"30px"}}>
                        {
                         choosedQuiz.multipleChoise[index].choises.map((ch, i)=>{
                            return <div key={ i }>
                                {!editQuestionMultipleChoise ?
                                        <li >{i+1}. { ch }</li>
                                            :
                                        <input type="text" name="multipleChoise" value={ch} onChange={(e)=>updateQuestionMultipleChoise(e,i)} style={{marginLeft:"30px"}}/>
                                }
                                   </div>
                         })
                        }
                    </ul>
                        <h5>Answer</h5>
                            { !editQuestionMultipleChoise ?
                                <p style={{marginLeft:"30px"}}>{choosedQuiz.answer[index]}</p>
                                    :
                                    <input type="text" name="answer" value={choosedQuiz.answer[index]} onChange={(e)=>updateQuestionMultipleChoise(e)}/>
                            }
                   </div>
                    { !editQuestionMultipleChoise ?
                    <>
                    <button onClick={()=>{setShowQuizQuestion({ isOn:false, index:null })}}>Back to quiz tittle</button>
                    <button className="waves-effect waves-light light-blue accent-2 btn-small" onClick={()=>setEditQuestionMultipleChoise(true)}>Edit</button>
                    </>
                            :
                        <>
                        <button className="waves-effect waves-light light-blue accent-2 btn-small" onClick={sendUpdateToServerMultipleChoise}>Submit</button>
                        <button className="waves-effect waves-light pink darken-1 btn-small" onClick={cancelUpdateMultipleChoise}>Cancel</button>
                        </>
                    }
        </div>
    )
}

export default AdminQuizQuestion
