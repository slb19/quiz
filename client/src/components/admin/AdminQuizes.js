import React, {useState, useEffect} from 'react'
import AdminQuizItem from "./AdminQuizItem.js"

const Quizes = () => {

    const[allQuizAdmin, setAllQuizAdmin] = useState([])
    const[choosedQuiz, setChoosedQuiz]=useState({})

    useEffect(()=>{
        getAllQuizAdmin()
    },)

    const getAllQuizAdmin = () =>{
        fetch("http://localhost:5000/getAllQuiz/admin",{
            method:"GET",
            headers:{
                Accept:"Application/json",
                "Content-Type":"Application/json",
                "x-auth-token":localStorage.getItem("token")
            }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            setAllQuizAdmin([...data])
        }).catch(error=>{
            console.log(error)
        })
    }

    const chooseQuiz =(quiz)=>{
        setChoosedQuiz(quiz)
    }

    return (
        <div>
            {choosedQuiz._id ? <AdminQuizItem choosedQuiz={choosedQuiz} setChoosedQuiz={setChoosedQuiz}/>
            :
            <>
             {allQuizAdmin.map((quiz,i)=>{
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
