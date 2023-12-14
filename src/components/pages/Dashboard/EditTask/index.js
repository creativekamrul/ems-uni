import React, {useEffect, useContext, useState} from "react";
import styles from "./EditTask.module.css"
import {MainContext} from "../../../../state/Context";
import {toast, ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom"
import { useNavigate  } from "react-router-dom";
import axios from "axios";
const EditTask = () => {
    const {companyEmployees, getCompanyEmployees, user, EditTask, backBaseUrl} = useContext(MainContext)
    const [loading, setLoading] = useState(true)
    const {task_id} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        getCompanyEmployees(user.Company)
        getSingleTaskData(task_id)
    }, [])

    const getSingleTaskData = async (id) => {
        await axios.get(`${backBaseUrl}/api/tasks/${id}`).then((res)=>{
            if(res.status === 200){
                setLoading(false)
                setTaskName(res.data.data.attributes.TaskName)
                setTaskDescription(res.data.data.attributes.TaskDescription)
                setTaskAssignTo(res.data.data.attributes.AssignedTo)
                setTaskDueDate(res.data.data.attributes.DueDate)
            }
        }).catch(()=>{
            toast.error("Something went wrong")
        })
    }
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskAssignTo, setTaskAssignTo] = useState("")
    const [taskDueDate, setTaskDueDate] = useState("")
    const [taskAttachment, setTaskAttachment] = useState("")



    const submitHandaler = (e) => {
        e.preventDefault()
        if(taskName || taskDescription || taskDueDate || taskAssignTo){
            const taskInputData = {
                taskName, taskDueDate, taskDescription, taskAssignTo, taskAttachment, task_id
            }
            const status = EditTask(taskInputData)
            setTaskName("")
            setTaskDescription("")
            setTaskAssignTo("")
            setTaskDueDate("")

            if(status){
                toast.success("Task Edited Successfully")
                setTimeout(()=>{
                    navigate(`/tasks/${task_id}`)
                }, 1000)
            }
        }else {
            toast.error("Please fill all required fields")
        }
    }
   if (!loading){

       return(
           <div className={styles.main_add_task_section}>
               <div className={styles.add_task_container}>
                   <ToastContainer />
                   <h1>Edit Task</h1>
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
                           <input value={"Submit"} type="submit"/>
                       </div>
                   </form>
               </div>
           </div>
       )
   } else {
       return(
           <div className={styles.main_add_task_section}>
               <div className={styles.add_task_container}>
                   <ToastContainer />
                   <h1>Loading...</h1>
               </div>
           </div>
       )
   }

}
export default EditTask