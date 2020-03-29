import React , {useReducer} from "react";
import AuthContext from "./AuthContext.js";
import AuthReducer from "./AuthReducer.js"

import {
    LOGIN,
   
} from "../types.js"

const AuthState= props =>{
    const initialState={
        auth:false,
        token:null,
        error:null
        //loading:true
    }

const [state, dispatch] = useReducer(AuthReducer, initialState)    

const login = (loginForm)=>{
    fetch("http://localhost:5000/admin-login", {
        method:"POST",
        body:JSON.stringify(loginForm),
        headers:{
            Accept:"Application/json",
            "Content-Type":"Application/json"
        }
    }).then(res=>{
        return res.json()
    }).then(data=>{
      
        if(data.msg){
            dispatch({
                type:LOGIN,
                payload:data.msg
            })
            return ;
        }
        if(data.error){
            dispatch({
                type:LOGIN,
                payload:data.error
            })
            return ;
        }
        
        localStorage.setItem("token", data.token)
        dispatch({
            type:LOGIN,
           payload:data.token
        })

    }).catch(error=>{
        console.log(error)
        dispatch({
            type:LOGIN,
            payload:"Network Error"
        })
    })
}


return (<AuthContext.Provider
    value={{
        auth:state.auth,
        token:state.token,
        error:state.error,
       // loading:state.loading,
        login,
    }}>
        {props.children}
    </AuthContext.Provider>)

}

export default AuthState