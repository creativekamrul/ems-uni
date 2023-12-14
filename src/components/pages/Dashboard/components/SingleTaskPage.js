import React, {useContext, useState,  useEffect} from "react";
import {useParams} from "react-router-dom"
import {MainContext} from "../../../../state/Context";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import styles from "../dashboard.module.css"
import {Button, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useNavigate  } from "react-router-dom";
const SingleTaskPage = () => {
    const navigate = useNavigate()
    const {user, backBaseUrl, loading, setLoading, removeTask, completeTask, reOpenTask} = useContext(MainContext)
    const {task_id} = useParams()
    const [taskData, setTaskData] = useState("")
    const [submittedFile, setSubmittedFile] = useState("")
    const [currentTaskStatus, setCurrentTaskStatus] = useState(false)
    const getSingleTask = async (id) => {
        setLoading(true)
        await axios.get(backBaseUrl+`/api/tasks/${id}?populate=%2a`).then((res)=>{
            if (res.status === 200){
                setTaskData(res.data?.data)
                setCurrentTaskStatus(res.data?.data.attributes.isCompleted)
                setLoading(false)
            }
        }).catch((err)=>{
            toast.error("Something went wrong, try again")
        })
    }
    useEffect(()=>{
        getSingleTask(task_id)

    }, [task_id])

    const removeSingleTask = (id) => {
        const removeTaskStatus = removeTask(id)
        if (removeTaskStatus){
            setTimeout(()=>{
                navigate("/")
            }, 1000)
        }
    }
    const completeSingleTask = (id, submittedFile) => {
        const completeTaskStatus = completeTask(taskData.id, submittedFile)
        if (completeTaskStatus){
            setCurrentTaskStatus(true)
        }
    }
    const reOpenSingleTask = (id) => {
        const reOpenTaskStatus = reOpenTask(id)
        if (reOpenTaskStatus){
            setCurrentTaskStatus(false)
        }
    }
    if (!loading){
        return (
            <div className={styles.single_task_page_container}>
                <ToastContainer />
                <div style={currentTaskStatus === true ? {backgroundColor: " #00ac1f"} : {backgroundColor: " #096ce5"}}
                     className={styles.single_page_header}>
                    <h3>{taskData.attributes?.TaskName}</h3>
                    <div className={styles.task_controlls}>
                        {
                            currentTaskStatus === true ? (<Button onClick={()=>{reOpenSingleTask(taskData?.id)}} variant="secondary"><strong>Re-Open</strong></Button>) : (<Button onClick={()=>{completeSingleTask(taskData?.id, submittedFile)}} style={{backgroundColor: "#49be25"}}><strong>Complete</strong></Button>)
                        }
                        {user.UserType === "HR" ? (<>
                                <Button variant="warning"><Link to={`/tasks/edit/${task_id}`}>Edit</Link></Button>
                                <Button variant="danger" onClick={()=>{removeSingleTask(taskData?.id)}}>Remove</Button>
                            </>
                        ) : ""}
                    </div>
                </div>
                <div className={styles.single_page_content}>
                    <Row>
                        <Col className={styles.main_content} md={7}>
                            <h4>Assigned To : {taskData.attributes?.AssignedTo} | Due Date : {taskData.attributes?.DueDate}</h4>
                            <h4 className={"mt-5"}>Task Description</h4>
                            <p>{taskData.attributes?.TaskDescription}</p>
                            {
                                taskData?.attributes?.TaskAttachment.data === null ? "" : (  <Button className={"mt-3"}><a target={"_blank"} download={backBaseUrl+taskData.attributes?.TaskAttachment.data.attributes.name} href={backBaseUrl+taskData.attributes?.TaskAttachment.data.attributes.url}>Download Task Attachments</a></Button>
                                )
                            }
                        </Col>
                        <Col md={5} className={`text-end ${styles.task_content_controls}`}>
                            {
                                taskData?.attributes?.SubmitedFiles.data === null && !currentTaskStatus ? (
                                        <form>
                                            <label htmlFor="submission_files">Upload file for submissions (Zip Recommended)</label>
                                            <input id={"submission_files"} onChange={(e) => setSubmittedFile(e.target.files[0])} type="file"/>
                                        </form>
                                    ) : taskData?.attributes?.SubmitedFiles.data === null && currentTaskStatus ? (
                                        <div><h5>No File Submitted </h5>to submit a file, please re-open the task</div>
                                    ) : !currentTaskStatus ? (
                                        <form>
                                            <label htmlFor="submission_files">Upload file for submissions (Zip Recommended)</label>
                                            <input id={"submission_files"} onChange={(e) => setSubmittedFile(e.target.files[0])} type="file"/>
                                        </form>
                                    )
                                       :
                                    (  <Button className={"mt-3 download_submitted_files"}><a target={"_blank"} download={backBaseUrl+taskData.attributes?.SubmitedFiles.data.attributes.name} href={backBaseUrl+taskData.attributes?.SubmitedFiles.data.attributes.url}>Download Submitted Files</a></Button>
                                )
                            }

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }else {
        return (
            <div className={styles.single_task_page_container}>
               <h2 style={{textAlign: "center"}}>Loading</h2>
            </div>
        )
    }
}
export default SingleTaskPage