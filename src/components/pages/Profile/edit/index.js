import React, {useContext, useState, useEffect} from 'react'
import {MainContext} from "../../../../state/Context";
import {useParams} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify";
import styles from "./edit.module.css"

const EditProfile = () => {
    const { user, updateProfile } = useContext(MainContext)
    const {user_id} = useParams()
    const pageUserId = user.id
    useEffect(()=>{
        setDesignation(user?.UserDesignation)
        setUsername(user?.username)
        setEmail(user?.email)
        setUserSalary(user?.EmployeeSalary)
        setPhoneNumber(user?.PhoneNumber)
        setLinkedInUrl(user?.LinkedinUrl)
    }, [user])


    const [username, setUsername] = useState("")
    const [userAvatar, setUserAvatar] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [designation, setDesignation] = useState("")
    const [linkedInUrl, setLinkedInUrl] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userSalary, setUserSalary] = useState("")

    const submitHandaler = (e) => {
        e.preventDefault()
        if(email === "" || designation === "" || username === "" || designation === ""){
            toast.error("Please fill all the fields");
        }else {
            const userData = {
                username, email, password, designation, userAvatar, linkedInUrl, phoneNumber, userSalary, pageUserId
            }
            updateProfile(userData);
        }

    }
    return (
        <h1>{user?.UserType === "HR" || user?.id === pageUserId? (
            <div className='container'>
                <ToastContainer />
                <div className={styles.form_container}>
                    <h1>Edit Your Profile</h1>
                    <form onSubmit={submitHandaler}>
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Name'/>
                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
                        <input type="text" value={designation} onChange={(e)=> setDesignation(e.target.value)} placeholder="Designation"/>
                        <input type="text" value={linkedInUrl} onChange={(e)=> setLinkedInUrl(e.target.value)} placeholder="LinkedIn Url"/>
                        <input type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        {user.UserType  !== "HR" ? (<input type="text" value={userSalary} onChange={(e)=> setUserSalary(e.target.value)} placeholder="Salary Per Month"/>) : ""}
                        <label htmlFor={"userAvatar"}>Upload User Image</label>
                        <input type="file" id={"userAvatar"} onChange={(e) => setUserAvatar(e.target.files[0])} placeholder={"User Image"} />
                        <input type="submit" value={"Submit"} />
                    </form>
                </div>
            </div>
        ) : (
            <div>
                You are not authorized to perform this task
            </div>
        ) }</h1>

    )
}

export default EditProfile