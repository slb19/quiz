import React, {useState} from 'react'
import AdminQuizes from "./AdminQuizes.js"

const AdminDashboard = () => {

    const[addQuiz, setAddQuiz]= useState(false)
    const[next, setNext] = useState(false)

    const[quizTittle, setQuizTittle]=useState("")
    const[question, setQuestion] = useState("")
    const[multipleChoise, setMultipleChoise] = useState( [ {choises:[""] } ] )
    const[answer, setAnswer] = useState("")

    const[fullQuiz, setFullQuiz] = useState({
        quizTittle:"",
        finalQuestion:[],
        finalMultipleChoise:[],
        finalAnswer:[]
    })

    const[addToDb , setAddToDb]= useState({
       addedToDb:false,
        msg:""
    })

 
    const showQuiz = ()=>{
        setAddQuiz(true)
        setAddToDb({
            addedToDb:false,
            msg:""  
        })
    }

    const showNewQuestion = ()=>{
        setNext(true)
    }

    const addNewChoice =()=>{
        setMultipleChoise([{choises:[...multipleChoise[0].choises,""]}])
    }

    const handleQuestion =(e)=>{
        if(question.length <=1){
            setQuestion([e.target.value])
            return ;
        }
        setQuestion([...question,e.target.value])
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
        if(answer.length <=1){
            setAnswer([e.target.value])
            return ;
        }
        setAnswer([...answer,e.target.value])
    }

    const addToFinal=()=>{
        const final= fullQuiz
        final.quizTittle = quizTittle
        if(final.finalQuestion.length !==0){
            final.finalQuestion = [...final.finalQuestion, ...question];
            final.finalMultipleChoise = [...final.finalMultipleChoise, ...multipleChoise]
            final.finalAnswer = [...final.finalAnswer ,...answer]
        }else{
            final.finalQuestion=[...question]
            final.finalMultipleChoise = [...multipleChoise]
            final.finalAnswer = [...answer]
        }
        return final
        
    }

    const deleteInputValues = () =>{
        const inputs = document.getElementsByTagName("INPUT")
        for(let i = 0; i < inputs.length; i++){
           inputs[i].value = ""
         }
    }

    const addNewQuestion = () =>{
  
        const final = addToFinal()
        deleteInputValues()

        setFullQuiz(final)

        setQuestion("")
        setMultipleChoise( [ {choises:[""] } ] )
        setAnswer("")
    }

    const resetSomeOfTheState=()=>{
        setAddQuiz(false)
        setNext(false)
        setQuizTittle("")
        setQuestion("")
        setMultipleChoise([ {choises:[""] } ])
        setAnswer("")
    }

    const submitQuizHandler = (e) =>{

        e.preventDefault()
        resetSomeOfTheState()
        addToFinal()
        console.log(fullQuiz)

        fetch("http://localhost:5000/enterQuiz",{
            method:"POST",
            body: JSON.stringify(fullQuiz),
            headers:{
                Accept:"Application/json",
                "Content-Type":"Application/json"
            } 
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data.quiz)
            setAddToDb({
                addedToDb:true,
                msg:data.msg
            })
            setFullQuiz({
                quizTittle:"",
                finalQuestion:[],
                finalMultipleChoise:[],
                finalAnswer:[]  
            })
        }).catch(error=>{
            console.log(error)
        })
    } 

    const cancel =()=>{
        resetSomeOfTheState()
        setFullQuiz({
            quizTittle:"",
            finalQuestion:[],
            finalMultipleChoise:[],
            finalAnswer:[] 
        })
    }

    return (
        <div className="row">
             <div className="col s12 m6">
                {!addQuiz && <button onClick={showQuiz} className="waves-effect waves-light-blue accent-1 btn-large add-quiz-button">Add a new quiz</button> }
                 {addToDb.addedToDb && <p>{addToDb.msg}</p>}
                  { addQuiz &&
                   <>
                    <form>
                    <div>
                        <p>Quiz Tittle</p>
                            <div className="input-field">
                                <input type="text" name="quizTittle" value={quizTittle} onChange={e=> setQuizTittle(e.target.value)} required />   
                            </div>
                       {!next && <button onClick={showNewQuestion}>next</button>} 
                    </div>
                    { next &&
                    <>
                    <div>
                        <p>Question</p>
                            <div className="input-field">
                                <input type="text" name="question" value={question} onChange={handleQuestion } required />   
                            </div>
                    </div>
                      
                    {
                        multipleChoise[0].choises.map((choice, index)=>{
                            return <div key={index} className="input-field choises-input">
                                        <p>Multiple Choise</p>
                                             <input type="text" name="multipleChoise" value={choice.choices} id={index} onChange={handleMultipleChoise}  required /> 
                                    </div>
                                })
                            }
                            <button onClick={addNewChoice} style={{marginLeft:"50px"}}>add new choise</button>
                    <div>
                        <p>Answer</p>
                            <div className="input-field">
                                <input type="text" name="question" value={answer} onChange={handleAnswer}  required />   
                            </div>
                    </div>
                        {next && <button onClick={addNewQuestion}>Add a new Question</button>}
                            <button type="submit" onClick={submitQuizHandler}>Finish</button>
                       </>  
                    }
                   
                   </form>  
                {addQuiz && <button onClick={cancel}>Cancel</button> }  
                   </>
                     
                    }
             </div>
             <div className="col s12 m6">
                 <AdminQuizes/>
             </div>
      </div>
    )
}

export default AdminDashboard

/*
    const closeAddQuiz = ()=>{
        setAddQuiz({
        ...addQuiz,
        init:false,
        question:false
    })
    }
*/
/*
<input type="submit" value="Submit" onClick={closeAddQuiz}
className="waves-effect waves-light btn-small"
    style={{backgroundColor:"#0091ea"}} />
*/

//{ (quizTittle && question.length!==0 && multipleChoise.choises.length!==0 && answer.length!==0) && <input type="submit" value="submit"/>}

// const[fullQuiz, setFullQuiz] = useState({
//     quizTittle:"",
//     finalQuestion:[],
//     finalMultipleChoise:[],
//     finalAnswer:[]
// })