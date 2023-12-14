import React from "react";
import styles from "../dashboard.module.css"
import {Link} from "react-router-dom";

const SingleTask = ({name, id}) => {
    return (
        <div className={styles.single_task_box}>
            <Link to={"/tasks/"+id}><h2>{name}</h2></Link>
        </div>
    )
}
export default SingleTask