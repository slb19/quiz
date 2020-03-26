import {
    GET_ALL_QUIZ,
    
} from "../types.js"

export default (state, action)=>{
    switch(action.type){
        case GET_ALL_QUIZ:
            return{
                ...state,
                allQuiz:action.payload,
                //loading:false    
            }
      
        default: return state
    }

}