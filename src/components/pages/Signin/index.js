import React, {useContext, useState, useEffect} from 'react'
import styles from "./signin.module.css"
import {MainContext} from "../../../state/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";

const SignIn = () => {
  const { userLogin, error, isUserSignedIn } = useContext(MainContext)
  useEffect(() => error && toast.error(error))
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const submitHandaler = (e) => {
    e.preventDefault();
    const identifier = userEmail
    const password = userPassword
    if(identifier === "" || password === ""){
      toast.error("Please fill all the fields");
    }else {
      userLogin(identifier, password)
      setUserEmail("")
      setUserPassword("")
    }

  }
  return (
    <div className='container'>
      <ToastContainer />
      {isUserSignedIn ? (
          <div className={styles.singined_text}>
            <h1>You are signed in</h1>
            <Link to={"/"}>Dashboard</Link>
          </div>
      ) : (
          <div>
            <div className={styles.form_container}>
              <h1>Sign In</h1>
              <form onSubmit={submitHandaler}>
                <input type="email" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} placeholder='Email'/>
                <input type="password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder='password'/>
                <input type="submit" value={"Log in"} />
              </form>
            </div>
          </div>
      )}

    </div>
  )
}
export default SignIn