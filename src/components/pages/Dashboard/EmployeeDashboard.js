import React, {useContext} from 'react'
import styles from "./dashboard.module.css"
import TaskList from "./components/TaskList";
import {MainContext} from "../../../state/Context";

const Dashboard = () => {
    const {user} = useContext(MainContext)
    return (
        <div className={styles.dashboard_main_container+" employ_dashboard"}>
            <div className={`${styles.top_part} d-flex justify-content-between align-items-center`} >
                <h1>Tasks</h1>
            </div>
            <div className={styles.task_list}>
                <TaskList />
            </div>
        </div>
    )
}

export default Dashboard