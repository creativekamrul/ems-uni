import React, {useContext, useState, useEffect} from 'react'
import styles from "./signup.module.css"
import {MainContext} from "../../../state/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
const Signup = () => {
  const { registerUser, error, isUserSignedIn } = useContext(MainContext)
  useEffect(() => error && toast.error(error))

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [LicenceCode, setLicenceCode] = useState("")
  const [linkedInUrl, setLinkedInUrl] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [Company, setCompany] = useState("")
  const [userAvatar, setUserAvatar] = useState([])
  const submitHandaler = (e) => {
    e.preventDefault()
    if(email === "" || password === "" || username === "" || LicenceCode === "" || Company === ""){
      toast.error("Please fill all the fields");
    }else {
      const userData = {
        username, email, password, LicenceCode, Company, userAvatar, linkedInUrl, phoneNumber
      }
      registerUser(userData);
      setLicenceCode("")
      setUsername("")
      setEmail("")
      setPassword("")
      setCompany("")
      setLinkedInUrl("")
      setPhoneNumber("")
      document.getElementById("userAvatar").value = ""
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
      <div className={styles.form_container}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandaler}>
          <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Name'/>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
          <input type="text" value={Company} onChange={(e)=> setCompany(e.target.value)} placeholder='Org Name'/>
          <input type="text" value={LicenceCode} onChange={(e)=> setLicenceCode(e.target.value)} placeholder="Licence Code"/>
          <input type="text" value={linkedInUrl} onChange={(e)=> setLinkedInUrl(e.target.value)} placeholder="LinkedIn Url"/>
          <input type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
          <label htmlFor={"userAvatar"}>Upload Your Image</label>
          <input type="file" id={"userAvatar"} onChange={(e) => setUserAvatar(e.target.files[0])} placeholder={"User Image"} />
          <input type="submit" value={"Sign Up"} />
        </form>
      </div>
      )}
    </div>
  )
}

export default Signup