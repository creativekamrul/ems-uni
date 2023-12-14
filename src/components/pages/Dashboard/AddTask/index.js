import React, {useEffect, useContext, useState} from "react";
import styles from "./AddTask.module.css"
import {MainContext} from "../../../../state/Context";
import {toast, ToastContainer} from "react-toastify";

const AddTask = () => {
    const {companyEmployees, getCompanyEmployees, user, addTask} = useContext(MainContext)
    useEffect(()=>{
        getCompanyEmployees(user.Company)
    }, [])
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskAssignTo, setTaskAssignTo] = useState("")
    const [taskDueDate, setTaskDueDate] = useState("")
    const [taskAttachment, setTaskAttachment] = useState("")
const submitHandaler = (e) => {
        e.preventDefault()
    if(taskName || taskDescription || taskDueDate || taskAssignTo){
        const taskInputData = {
            taskName, taskDueDate, taskDescription, taskAssignTo, taskAttachment
        }
        const status = addTask(taskInputData)
        setTaskName("")
        setTaskDescription("")
        setTaskAssignTo("")
        setTaskDueDate("")

        if(status){
            toast.success("Task has been added")
        }
    }else {
        toast.error("Please fill all required fields")
    }
}
    return(
        <div className={styles.main_add_task_section}>
            <div className={styles.add_task_container}>
                <ToastContainer />
                <h1>Add Task</h1>
                <form onSubmit={submitHandaler}>
                    <div className={styles.single_input_box}>
                        <label htmlFor="task_name">Task Name*</label>
                        <input value={taskName} onChange={(e)=>{setTaskName(e.target.value)}} id={"task_name"} type="text"/>
                    </div>
                    <div className={styles.single_input_box}>
                        <label htmlFor="task_description">Task Description*</label>
                        <input value={taskDescription} onChange={(e)=>{setTaskDescription(e.target.value)}} id={"task_description"} type="text"/>
                    </div>
                    <div className={styles.single_input_box}>
                        <label htmlFor="task_assign_to">Assign To*</label>
                        <select value={taskAssignTo} onChange={(e)=>{setTaskAssignTo(e.target.value)}} name="task_assign_to" id="task_assign_to">
                            <option value="" hidden >Select</option>
                            {
                                companyEmployees?.map((e)=>{
                                    return(<option key={e.id} value={e.username}>{e.username}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.single_input_box}>
                        <label htmlFor="task_due_date">Due Date*</label>
                        <input value={taskDueDate} onChange={(e)=>{setTaskDueDate(e.target.value)}} id={"task_due_date"} type="text"/>
                    </div>
                    <div className={styles.single_input_box}>
                        <label htmlFor="task_name">Upload Task Attachment</label>
                        <input onChange={(e)=>{setTaskAttachment(e.target.files[0])}} id={"task_name"} type="file"/>
                    </div>
                    <div className={styles.single_input_box}>
                        <input value={"Add Task"} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddTask