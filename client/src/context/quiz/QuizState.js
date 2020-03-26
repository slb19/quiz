import React , {useReducer} from "react";
import QuizContext from "./QuizContext.js";
import QuizReducer from "./QuizReducer.js"

import {
    GET_ALL_QUIZ,
   
} from "../types.js"

const QuizState= props =>{
    const initialState={
        allQuiz:[],
        //loading:true
    }

const [state, dispatch] = useReducer(QuizReducer, initialState)  

const getAllQuiz = () =>{
    fetch("http://localhost:5000/getAllQuiz",{
        method:"GET",
        headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json"
        }
    }).then(res=>{
        return res.json()
    }).then(data=>{
        dispatch({
            type:GET_ALL_QUIZ,
            payload:data
        })
    })
}

return (<QuizContext.Provider
    value={{
        allQuiz:state.allQuiz,
        //loading:state.loading,
        getAllQuiz,
    }}>
        {props.children}
    </QuizContext.Provider>)

}

export default QuizState