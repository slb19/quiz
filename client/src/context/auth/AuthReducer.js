import {
    LOGIN,
    
} from "../types.js"

export default (state, action)=>{
    switch(action.type){
        case LOGIN:
            if(action.payload ==="Invalid Credentials" ||action.payload ==="Server Error" ||action.payload === "Network Error"){
              
                return{
                    ...state,
                    error:action.payload
                }
            }else{
                
                return{
                    ...state,
                    auth:true,
                    token:localStorage.getItem("token"),          
                }
            }
            
        default: return state
    }

}