import React, {useContext, useState, useEffect} from 'react'
import {MainContext} from "../../../../state/Context";
import {useParams} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify";
import styles from "./editEmployeeProfile.module.css"
import {Button} from "react-bootstrap";

const EditEmployeeProfile = () => {
    const { updateUser, companyEmployees, removeEmployee } = useContext(MainContext)
    const {emp_id} = useParams()
    const user = companyEmployees[emp_id]
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
                username, email, userSalary, designation, userAvatar, linkedInUrl, phoneNumber, emp_id
            }
            updateUser(userData);
        }

    }
    const removeHandler = (id) => {
        removeEmployee(id)
    }
    return (
        <div>
            <div className='container'>
                <ToastContainer />
                <div className={styles.form_container}>
                    <div className={styles.heading_container}>
                        <h1>Edit Profile</h1>
                        {user?.UserType !== "HR" ? (<Button onClick={()=>removeHandler(user.id)} className={"remove_user_btn"} variant={"danger"}>Remove Employee</Button>) : ""}
                    </div>
                    <form onSubmit={submitHandaler}>
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Name'/>
                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                        {user?.UserType !== "HR" ? (<input type="text" value={userSalary} onChange={(e)=> setUserSalary(e.target.value)} placeholder='Salary'/>): ""}
                        {user?.UserType === "HR" ? ( <input disabled type="text" value={designation} onChange={(e)=> setDesignation(e.target.value)} placeholder="Designation"/>) : ( <input type="text" value={designation} onChange={(e)=> setDesignation(e.target.value)} placeholder="Designation"/>)}
                        <input type="text" value={linkedInUrl} onChange={(e)=> setLinkedInUrl(e.target.value)} placeholder="LinkedIn Url"/>
                        <input type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        <label htmlFor={"userAvatar"}>Upload User Image</label>
                        <input type="file" id={"userAvatar"} onChange={(e) => setUserAvatar(e.target.files[0])} placeholder={"User Image"} />
                        <input type="submit" value={"Submit"} />
                    </form>

                </div>
            </div>
        </div>

    )
}

export default EditEmployeeProfile