import React, {useContext} from "react"
import Styles from "./profile.module.css"
import {MainContext} from "../../../state/Context";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Profile = () => {
    const {user, backBaseUrl} = useContext(MainContext)
    return(
        <div className={Styles.profile_container}>
            <div className={Styles.top_details}>
                <div className={Styles.profile_image}>
                    <img src={`${backBaseUrl+user.userAvatar?.url}`} alt=""/>
                </div>
                <div className={Styles.user_main_details}>
                    <h1>{user?.username}</h1>
                    <h3>{user?.UserDesignation}</h3>
                    <div className={Styles.social_media}>
                        <h6><a href={user.LinkedinUrl} target={"_blank"}>LinkedIn</a></h6>
                    </div>
                </div>
            </div>
            <div className={Styles.main_details}>
                <h2>Details</h2>
                <h3>Full Name : <span>{user?.username}</span></h3>
                <h3>Email: <span>{user?.email}</span></h3>
                <h3>Phone : <span>{user?.PhoneNumber}</span></h3>
                <h3>Company: <span>{user?.Company}</span></h3>
                {user.UserType !== "HR" ? (<h3>Salary: <span>{user?.EmployeeSalary}</span></h3>) : ""}
                <Button className={"mt-3"} variant={"success"}><Link to={`/profile/edit/${user.id}`}>Edit Profile</Link></Button>
            </div>
        </div>
    )
}
export default Profile