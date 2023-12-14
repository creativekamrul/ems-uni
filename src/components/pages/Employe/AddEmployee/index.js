import React, {useContext, useState, useEffect} from 'react'
import styles from "./addEmployee.module.css"
import {MainContext} from "../../../../state/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
const AddEmployee = () => {
    const { addEmployee, error, isUserSignedIn } = useContext(MainContext)
    useEffect(() => error && toast.error(error))

    const [username, setUsername] = useState([])
    const [userAvatar, setUserAvatar] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [designation, setDesignation] = useState("")
    const [linkedInUrl, setLinkedInUrl] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userSalary, setUserSalary] = useState("")
    const submitHandaler = (e) => {
        e.preventDefault()
        if(email === "" || password === "" || username === "" || designation === ""){
            toast.error("Please fill all the fields");
        }else {
            const userData = {
                username, email, password, designation, userAvatar, linkedInUrl, phoneNumber, userSalary
            }
            addEmployee(userData);
            setDesignation("")
            setUsername("")
            setEmail("")
            setPassword("")
            setUserSalary("")
            setPhoneNumber("")
            setLinkedInUrl("")
            document.getElementById("userAvatar").value = ""
        }

    }
    return (
        <div className='container'>
            <ToastContainer />
                <div className={styles.form_container}>
                    <h1>Add Employee</h1>
                    <form onSubmit={submitHandaler}>
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Name'/>
                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
                        <input type="text" value={designation} onChange={(e)=> setDesignation(e.target.value)} placeholder="Designation"/>
                        <input type="text" value={linkedInUrl} onChange={(e)=> setLinkedInUrl(e.target.value)} placeholder="LinkedIn Url"/>
                        <input type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        <input type="text" value={userSalary} onChange={(e)=> setUserSalary(e.target.value)} placeholder="Salary Per Month"/>
                        <label htmlFor={"userAvatar"}>Upload User Image</label>
                        <input type="file" id={"userAvatar"} onChange={(e) => setUserAvatar(e.target.files[0])} placeholder={"User Image"} />
                        <input type="submit" value={"Add"} />
                    </form>
                </div>
        </div>
    )
}

export default AddEmployee