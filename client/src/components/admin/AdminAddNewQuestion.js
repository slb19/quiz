import React, {useState} from 'react'

const AdminAddNewQuestion = ({setAddNewQuestion, choosedQuiz, setChoosedQuiz, setUpdateDb}) => {

    const[question, setQuestion] = useState("")
    const[multipleChoise, setMultipleChoise] = useState( [ {choises:[""] } ] )
    const[answer, setAnswer] = useState("")

    const handleQuestion =(e)=>{
        
        setQuestion(e.target.value)
    }

    const addNewChoice =()=>{
        setMultipleChoise([{choises:[...multipleChoise[0].choises,""]}])
    }

    const handleMultipleChoise=(e)=>{
        let choises = multipleChoise[0].choises
        if(multipleChoise[0].choises.length <=1){
            setMultipleChoise([{choises:[e.target.value]}])
        }else{
            choises[e.target.id] = e.target.value
            setMultipleChoise([{choises:choises}])
        }        
    }

    const handleAnswer=(e)=>{
      
        setAnswer(e.target.value)
    }

    const deleteInputValues = () =>{
        const inputs = document.getElementsByTagName("INPUT")
        for(let i = 0; i < inputs.length; i++){
           inputs[i].value = ""
         }
    }

    const handleCancel=()=>{
        setQuestion("")
        setMultipleChoise([ {choises:[""] } ])
        setAnswer("")
        deleteInputValues()
        setAddNewQuestion(false)
    }

    const submitAddNewQuestion = (e)=>{
        e.preventDefault()
        const updatedQuiz = choosedQuiz
        updatedQuiz.question.push(question)
            for(let i =0 ; i<multipleChoise.length ; i++){
                updatedQuiz.multipleChoise=[...updatedQuiz.multipleChoise, multipleChoise[i]]
            }
       
        updatedQuiz.answer.push(answer)
        console.log(updatedQuiz)
            fetch(`http://localhost:5000/updateQuiz/${choosedQuiz._id}`,{
                 method:"PUT",
                body: JSON.stringify(updatedQuiz),
                headers:{
                Accept:"Application/json",
                "Content-Type":"Application/json",
                //"x-auth-token":localStorage.getItem("token")
               }
             }).then(res=>{
                 return res.json()
             }).then(data=>{
                 console.log(data)
                 if(data.msg) setUpdateDb({
                    updatedDb:true,
                    msg:data.msg
                 })
                 if(data.msg ==="Quiz data were not ok! Please submit all forms"){
                     const choosedQuizCopy = choosedQuiz
                    for(let property in choosedQuizCopy){
                        if(property==="question" || property=== "multipleChoise" || property==="answer"){
                            choosedQuizCopy[property].pop()
                        }     
                    }
                    setChoosedQuiz(choosedQuizCopy)  
                }
                 setAddNewQuestion(false) 
             }).catch(error=>{
                 console.log(error)
             }) 
    } 

    return (
        <div>
            <form>
            <div>
                <p>Question</p>
                        <div className="input-field">
                            <input type="text" name="question" onChange={handleQuestion} required />   
                        </div>
                    </div>
                    <div>
                      {
                        multipleChoise[0].choises.map((choice, index)=>{
                            return <div key={index} className="input-field choises-input">
                                        <p>Multiple Choise</p>
                                             <input type="text" name="multipleChoise" value={choice.choices} id={index} onChange={handleMultipleChoise}  required /> 
                                    </div>
                                })
                            }
                        <button onClick={addNewChoice} style={{marginLeft:"50px"}}>add new choise</button>
                    </div>
                    <div>
                        <p>Answer</p>
                            <div className="input-field">
                                <input type="text" name="question" onChange={handleAnswer} required />   
                            </div>
                    </div>
                    <button type="submit" onClick={submitAddNewQuestion}>Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default AdminAddNewQuestion
