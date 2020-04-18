import React, {useState, useEffect} from 'react'
import AdminQuizItem from "./AdminQuizItem.js"

const Quizes = ({getAllQuizAdmin, allQuizAdmin}) => {

    //const[allQuizAdmin, setAllQuizAdmin] = useState([])
    const[choosedQuiz, setChoosedQuiz]=useState({})
    const[deleteFromDb , setDeleteFromDb]= useState({
        deleteFromDb:false,
         msg:""
     })

    useEffect(()=>{
        
        getAllQuizAdmin()
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            setDeleteFromDb({
                deleteFromDb:false,
                msg:""
            })
        },5000)      
    }, [deleteFromDb.deleteFromDb])

    /*
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
*/
    const deleteQuiz = (id) =>{
        console.log(id)
       fetch(`http://localhost:5000/deleteQuiz/${id}`,{
           method:"DELETE",
           headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json",
            "x-auth-token":localStorage.getItem("token")
           }
       }).then(res=>{
           return res.json()
       }).then(data=>{
           console.log(data)
           setDeleteFromDb({
            deleteFromDb:true,
            msg:data.msg
           })
           getAllQuizAdmin()
       }).catch(error=>{
           console.log(error)
       }) 
    }

    const chooseQuiz =(quiz)=>{
        setChoosedQuiz(quiz)
    }

    return (
        <div>
            {deleteFromDb.deleteFromDb && <p>{deleteFromDb.msg}</p>}
            {choosedQuiz._id ? <AdminQuizItem choosedQuiz={choosedQuiz} setChoosedQuiz={setChoosedQuiz} getAllQuizAdmin={getAllQuizAdmin} allQuizAdmin={allQuizAdmin}/>
            :
            <>
             {allQuizAdmin.map((quiz,i)=>{
                return <span key={quiz._id}>
                           <h5 style={{textDecoration:"underline", cursor:"pointer"}} className="admin-quiz-tittle" onClick={()=>chooseQuiz(quiz)}>{i+1}. {quiz.quizTittle}</h5>
                           <button onClick={()=>deleteQuiz(quiz._id)} className="waves-effect waves-light pink darken-1 btn-small">Delete</button>
                        </span>
            })}
            </>
        } 
        </div>
    )
}

export default Quizes
