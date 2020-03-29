import React, {useContext, useState, useEffect} from 'react'
//import {Link} from "react-router-dom"
//import {useParams} from "react-router";
import QuizContext from "../../context/quiz/QuizContext.js"

const QuizPage = ({quiz_id, backToQuizes}) => {

    const quizContext = useContext(QuizContext)
    const { allQuiz } = quizContext
 
    //let { quiz_id } = useParams()

  // eslint-disable-next-line
    const[quizIndex, setQuixIndex] = useState(quiz_id - 1)
    const[innerIndex, setInnerIndex] = useState(0)
    const[isQuizFinished, setIsQuizFinished] = useState(false)
    const[score, setScore] = useState(0)

    const[quiz, setQuiz] = useState({
        question:allQuiz[quizIndex].question[innerIndex],
        multipleChoise:[...allQuiz[quizIndex].multipleChoise[innerIndex].choises],
        submittedAnswer:null,
        isCorrect:null,
       // isQuizFinished:false
    })

    useEffect(()=>{
        if(quiz.submittedAnswer === null) return;
        submitAnswer()
        //console.log(allQuiz[quizIndex].question.length , innerIndex +1)
       if(allQuiz[quizIndex].question.length === innerIndex +1){
           setIsQuizFinished(true)
       }
       // eslint-disable-next-line
    },[quiz.submittedAnswer])

    useEffect(()=>{
        console.log(allQuiz)
        setQuiz({
            question:allQuiz[quizIndex].question[innerIndex],
            multipleChoise:[...allQuiz[quizIndex].multipleChoise[innerIndex].choises],
            submittedAnswer:null,
            isCorrect:null,
        })
        // eslint-disable-next-line
    },[quizIndex, innerIndex])

    useEffect(()=>{
        
        let scorePercent = score / allQuiz[quizIndex].question.length
        console.log(scorePercent)
        setScore(scorePercent * 100)
        
       // eslint-disable-next-line
    },[quiz.submittedAnswer])

    const makeAllCheckboxesFalse =()=>{
        const checkboxes = document.getElementsByClassName("radioCheck");
         for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked === true) checkboxes[i].checked = false;
         }
    }

    const check=(e)=>{ //only 1 checkbox active 
      
         makeAllCheckboxesFalse()
         if(e.target.checked === true){
            e.target.checked = false;
         }else{
            e.target.checked = true; 
         }    
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        Array.from(e.target).forEach(input=>{
            if(input.checked === true){
                setQuiz({...quiz, submittedAnswer:input.value})
                }
        })
    }

    const submitAnswer =()=>{
        fetch(`http://localhost:5000/getCorrectAnswer/${quiz_id}?submittedAnswer=${quiz.submittedAnswer}&innerIndex=${innerIndex}`,{
            method:"GET",
            headers:{
                Accept:"Application/json",
                "Content-Type":"Application/json"
            } 
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data.msg)
            data.msg === "submitted answer is correct" ? setQuiz({...quiz, isCorrect:true}) : setQuiz({...quiz, isCorrect:false})
                if(data.msg === "submitted answer is wrong"){
                    return ;
                }else if(data.msg === "submitted answer is correct"){
                    setScore(score + 1)
               
                }    
        }).catch(error=>{
            console.log(error)
        })
    }

    const goToNextQuestion = () =>{
        
        setInnerIndex(innerIndex + 1)
        makeAllCheckboxesFalse()
    }

    return (
        <div>
          <h4>{ quiz.question }</h4>
          <form onSubmit={onSubmit} className="checkboxes-form">
            {quiz.multipleChoise.map((choise, index)=>{
                return <p key={index}>
                    <label>
                        <input type="checkbox" className="radioCheck" onClick={check} name="submittedAnswer" value={choise}/>
                        <span>{ choise }</span>  
                    </label>
                        </p>
                      })}
                      {quiz.submittedAnswer=== null &&<button type="submit" className="waves-effect waves-light btn-small blue darken-1">submit</button>}
                </form>
                    {(quiz.submittedAnswer!== null && !isQuizFinished ) && <button onClick={ goToNextQuestion } className="waves-effect waves-light btn-small">Next</button>}
                    {quiz.isCorrect && <p>Your answer is correct</p>}
                    {quiz.isCorrect=== false && <p>Your answer is wrong</p>}

                    {isQuizFinished && <div>
                                            <p>Quiz has finished</p>
                                            <p>Your score is {score}%</p>
                                                {/*<Link to="/choose-quiz" style={{color:'blue', marginLeft:"500px", textDecoration:"underline"}}>Go to quizes</Link> */}
                                                <button onClick={backToQuizes} className="waves-effect waves-light btn-small">Go to Quizes</button>
                                        </div>}
        </div>
    )
}

export default QuizPage

// <h5>{allQuiz[quizIndex].question[quizIndex]}</h5>
/*
<form>
{allQuiz[quizIndex].multipleChoise.map((choise, index)=>{
  return <p>
      <label>
        <input type="checkbox" />
            <span>{ choise }</span>
      </label>
    </p>
})}
</form>
*/