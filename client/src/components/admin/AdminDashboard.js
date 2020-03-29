import React, {useContext, useState} from 'react'
import QuizContext from "../../context/quiz/QuizContext.js"

const AdminDashboard = () => {

    const quizContext = useContext(QuizContext)
    const {allQuiz} = quizContext;

    const[addQuiz, setAddQuiz]= useState({
        init:false,
        question:false,
        multipleChoise:false
    })

    const[addQuizForm, setAddQuizForm] = useState({
        quizTittle:"",
        question:[""],
        multipleChoise:{choises:[""]},
        answer:""
    })

    const{quizTittle, question, multipleChoise, answer} = addQuizForm;

    const showQuizTittle=()=>{
        setAddQuiz({
             ...addQuiz,
            init:true
        })
     }

    const showQuizQuestion =()=>{
        if(addQuizForm.quiz !==""){
            setAddQuiz({
                ...addQuiz,
                question:true
            })
        }
    }

    const showQuizmultipleChoise =()=>{
        const index = addQuizForm.question.length
        if(addQuizForm.question[index - 1] !==""){
            setAddQuiz({
                ...addQuiz,
                multipleChoise:true,

            })
        }
    }

    const onChange = (e)=>{
      console.log(e.target.id)
        if(e.target.id="quizTittle"){
            
            setAddQuizForm({...addQuizForm, [e.target.name]:e.target.value})
            return;
        }
        if(e.target.id="question"){
            const questionCopy= addQuizForm.question
            //const index=addQuizForm.length
            questionCopy.push(e.target.value)
            setAddQuizForm({...addQuizForm, question:questionCopy})
            return;
        }
       
           
    }

    return (
        <div className="row">
             <div className="col s12 m6">
                 <button onClick={showQuizTittle} className="waves-effect waves-light-blue accent-1 btn-large add-quiz-button">Add a new quiz</button>
                    {addQuiz.init && 
                    <>
                    <form>
                    <div>
                        <p>Quiz Tittle</p>
                        <div className="input-field">
                            <input type="text" name="quizTittle" value={quizTittle} onChange={onChange} id="quizTittle" required />   
                        </div>
                        { !addQuiz.question && <button onClick={showQuizQuestion}>next</button> }
                    </div>

                    { addQuiz.question && <div>
                       <p>Question</p>
                       <div className="input-field">
                           <input type="text" name="question" value={question} onChange={onChange} id="question" required />   
                       </div>
                       { !addQuiz.multipleChoise && <button onClick={showQuizmultipleChoise}>next</button> }
                   </div> }
                  
                   </form>
                   </>
                    }
             </div>
             <div className="col s12 m6">6-columns (one-half)</div>
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