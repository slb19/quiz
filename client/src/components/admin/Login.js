import React, {useState, useContext, useEffect} from 'react'
import AuthContext from "../../context/auth/AuthContext.js"
import { withRouter } from "react-router-dom";

const Login = ({history}) => {

    const authContext = useContext(AuthContext)
    const { login, auth , token, error} = authContext

    const[loginForm, setLoginForm]=useState({
        username:"",
        password:"",
       
    });

    const{username, password} = loginForm

    useEffect(()=>{
        if(auth && token){
             history.push("/admin-dashboard")
        }
         
     }, [auth, token, history])

    const onChange=(e)=>{
        setLoginForm({...loginForm, [e.target.name]:e.target.value})   
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(loginForm)
        login(loginForm)
        //  setLoginForm({
        //   username:"",
        //     password:""
        //   })    
    }

    return (
        <div className='container'>

        {error && <div>{error}</div>}

            <form onSubmit={onSubmit}>
                <h3>Log In</h3>
                <div className="input-field">
                    <input type="text" name="username" value={username} onChange={onChange} required />
                    <label htmlFor="username">Username</label>
                </div>
            
                    <div className="input-field">
                    <input type="password" name="password" value={password} onChange={onChange} required />
                    <label htmlFor="password">Password</label>
                </div>
                <input type="submit" value="Submit" 
                                className="waves-effect waves-light btn-large"
                                    style={{backgroundColor:"#0091ea"}} />
            </form>
                
        </div>
    )
}

export default withRouter(Login)
