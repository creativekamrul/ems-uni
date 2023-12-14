import React, {useContext} from 'react'
import styles from "./dashboard.module.css"
import TaskList from "./components/TaskList";
import {Link} from "react-router-dom";
import {MainContext} from "../../../state/Context";

const Dashboard = () => {
    const {isUserSignedIn, user} = useContext(MainContext)
    if(isUserSignedIn){
        return (
            <div className={styles.dashboard_main_container}>
                <div className={`${styles.top_part} d-flex justify-content-between align-items-center`} >
                    <h1>Tasks</h1>
                    {user.UserType === "HR" ? ( <button className={"btn btn-success"}><Link to={"/add-task"}>Add Task</Link></button>) : ""}
                </div>
                <div className={styles.task_list}>
                    <TaskList />
                </div>
            </div>
        )
    }else {
        return (
            <div className={styles.dashboard_main_container}>
                <h1>Please sign in or sign up to continue</h1>
            </div>
        )
    }
}

export default Dashboard