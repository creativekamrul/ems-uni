import React, {useEffect, useContext, useState} from "react";
import styles from "../dashboard.module.css"
import {Row, Col, Container} from "react-bootstrap";
import SingleTask from "./SingleTask";
import {MainContext} from "../../../../state/Context";

const TaskList = () => {
    const {userTasks, user, getTasks, companyEmployees, getCompanyEmployees} = useContext(MainContext)
    useEffect(()=>{
        getTasks()
    }, [user])
    useEffect(()=>{
        getCompanyEmployees(user.Company)
    }, [])
    const [tempFilterVal, setTempFilterVal] = useState("all")

    return (
        <div>
            {
                user.UserType === "HR" ? (
                    <div className={styles.filter}>
                        <div className={styles.employe_filter}>
                            <label htmlFor="employe_filter">Employ</label>
                            <select onChange={(e)=> setTempFilterVal(e.target.value)} name="employe_filter" id="employe_filter">
                                <option value="all">All</option>
                                {
                                    companyEmployees?.map((e)=>{
                                        return(<option key={e.id} value={e.username}>{e.username}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                ) : ""
            }
            <div className={styles.main_task_list}>
                <Container fluid>
                    <Row>
                        <Col md={6} className={styles.open_tasks}>
                            <h3>Open Tasks</h3>
                            {
                                userTasks.data?.map((e)=>{
                                    if(tempFilterVal === "all"){
                                        if (e.attributes.isCompleted === false){
                                            return(<SingleTask key={e.id} id={e.id} name={e.attributes.TaskName} />)
                                        }
                                    }else if (tempFilterVal !== "all"){
                                        if (e.attributes.isCompleted === false && e.attributes.AssignedTo === tempFilterVal){
                                            return(<SingleTask key={e.id} id={e.id} name={e.attributes.TaskName} />)
                                        }
                                    }else {
                                        return (<h2>No tasks assigned</h2>)
                                    }

                                })
                            }
                        </Col>
                        <Col md={1}></Col>
                        <Col md={5} className={styles.closed_tasks}>
                            <h3>Completed Tasks</h3>
                            {
                                userTasks.data?.map((e)=>{
                                    if(tempFilterVal === "all"){
                                        if (e.attributes.isCompleted === true){
                                            return(<SingleTask key={e.id} id={e.id} name={e.attributes.TaskName} />)
                                        }
                                    }else if (tempFilterVal !== "all"){
                                        if (e.attributes.isCompleted === true && e.attributes.AssignedTo === tempFilterVal){
                                            return(<SingleTask key={e.id} id={e.id} name={e.attributes.TaskName} />)
                                        }
                                    }else {
                                        return (<h2>No tasks assigned</h2>)
                                    }

                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default TaskList