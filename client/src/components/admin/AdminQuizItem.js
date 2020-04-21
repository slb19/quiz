import React, {useState, useEffect} from 'react'
import AdminQuizQuestion from "./AdminQuizQuestion.js"
import AdminAddNewQuestion from "./AdminAddNewQuestion.js"

const AdminQuizItem = ({choosedQuiz, setChoosedQuiz, getAllQuizAdmin, allQuizAdmin}) => {

    const[showQuizQuestion, setShowQuizQuestion] = useState({
        isOn:false,
        index:null
    })

    const[editQuizTittleOrQuestion, setEditQuizTittleOrQuestion] = useState(false)
    const[addNewQuestion , setAddNewQuestion] = useState(false)
    const[updateDb , setUpdateDb]= useState({
        updatedDb:false,
         msg:""
     })

     useEffect(()=>{
        setTimeout(()=>{
            setUpdateDb({
                updatedDb:false,
                msg:""
            })
        },5000)      
    }, [updateDb.updatedDb])

    const updateQuizTittle =(e)=>{
            setChoosedQuiz({...choosedQuiz, quizTittle:e.target.value})       
    }

    const updateQuizQuestion = (e, i) =>{
        const choosedQuizCopy = choosedQuiz
        choosedQuizCopy.question[i] = e.target.value
        setChoosedQuiz({...choosedQuiz, question:choosedQuizCopy.question})
    }

    const sendUpdateToServer = () =>{
        setEditQuizTittleOrQuestion(false)
       
        fetch(`http://localhost:5000/updateQuiz/${choosedQuiz._id}`,{
            method:"PUT",
            body: JSON.stringify(choosedQuiz),
            headers:{
             Accept:"Application/json",
             "Content-Type":"Application/json",
             "x-auth-token":localStorage.getItem("token")
            }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            if(data.msg) setUpdateDb({
                updatedDb:true,
                msg:data.msg
            })
        }).catch(error=>{
            console.log(error)
        }) 
     }

     const cancelUpdate = () =>{
         
         const _id = choosedQuiz._id
         console.log(_id)
        //API CALL TO FETCH NON UPDATED QUIZ FROM DB
            fetch(`http://localhost:5000/getQuiz/admin/${_id}`, {
                method:"GET",
                headers:{
                 Accept:"Application/json",
                 "Content-Type":"Application/json",
                 "x-auth-token":localStorage.getItem("token")
                }
            }).then(res=>{
                return res.json()
            }).then(data=>{
                console.log(data)
                setChoosedQuiz(data)
                setEditQuizTittleOrQuestion(false)
                
            }).catch(error=>{
                console.log(error)
            })        
     }

    return (
        <div>
            {updateDb.updatedDb && <p>{updateDb.msg}</p>}
           { showQuizQuestion.isOn ? <AdminQuizQuestion choosedQuiz={choosedQuiz} setChoosedQuiz={setChoosedQuiz} showQuizQuestion={showQuizQuestion} setShowQuizQuestion={setShowQuizQuestion} sendUpdateToServer={sendUpdateToServer} cancelUpdate={cancelUpdate}/>
                    :
                <>       
                    <h4>Quiz tittle</h4>
                        <div>
                            {!editQuizTittleOrQuestion ? <p style={{marginLeft:"30px"}}>{choosedQuiz.quizTittle}</p> 
                            : 
                            <input type="text" name="quizTittle" value={choosedQuiz.quizTittle} onChange={updateQuizTittle} />
                            }
                          
                        </div>
                        
                    <h5>Questions
                       {!editQuizTittleOrQuestion && <button className="waves-effect waves-light teal accent-4-4 btn-small" onClick={()=>{ setAddNewQuestion(true)}}>+</button>}
                        </h5>  
                             {choosedQuiz.question.map((question, i)=>{
                                return <div key={i}>
                                    {!editQuizTittleOrQuestion ? 
                                        <p style={{textDecoration:"underline", cursor:"pointer", marginLeft:"30px" }} onClick={()=>{setShowQuizQuestion({ isOn:true , index: i })}}>{i+1}. {question}</p>
                                    :
                                    <input type="text" name="question" value={question} onChange={(e)=>updateQuizQuestion(e,i)} style={{marginLeft:"30px"}}/>
                                     }
                                </div>        
                            })} 

                        { addNewQuestion ? <AdminAddNewQuestion choosedQuiz={choosedQuiz} setChoosedQuiz={setChoosedQuiz} setAddNewQuestion={setAddNewQuestion} setUpdateDb={setUpdateDb} />
                            :    
                        <>
                            { !editQuizTittleOrQuestion ? 
                            <> 
                                <button onClick={()=>{ setChoosedQuiz({})
                                                getAllQuizAdmin() }}>back To All quizes</button>
                                <button className="waves-effect waves-light light-blue accent-2 btn-small" onClick={()=>setEditQuizTittleOrQuestion(true)}>Edit</button>
                      
                            </>
                                    :
                            <>
                                <button className="waves-effect waves-light light-blue accent-2 btn-small" onClick={sendUpdateToServer}>Submit</button>
                                <button className="waves-effect waves-light pink darken-1 btn-small" onClick={cancelUpdate}>Cancel</button>
                            </>
                        }
                    </>
                }
                </>         
            }  
        </div>
    )
}

export default AdminQuizItem
