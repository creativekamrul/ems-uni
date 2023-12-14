import { MainContext } from "./Context";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import MainReducer from "./Reducers";
import {GET_COMPANY_EMPLOYEES, SET_USER_TASKS, USER_SET} from "./Actions";
import Cookies from "universal-cookie"
import {toast} from "react-toastify";

const Store = ({ children }) => {
  //global variables
  const backBaseUrl = "http://localhost:1337";
  const frontBaseUrl = "http://localhost:3000";
  const cookies = new Cookies()

  useEffect(function () {
    getUser()
  }, [])


  const defaultState = {
    isUserSignedIn: false,
    user: {},
    companyEmployees: [],
    userTasks : [],
  };
  const [state, dispatch] = useReducer(MainReducer, defaultState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const Licences = ["13fg5265s85d6s", "13fg5265s86d5s", "13fg5655s85d6s"]

  const userLogin = async (identifier, password) => {
    const  data  = await axios.post(`${backBaseUrl}/api/auth/local`, {
      identifier: identifier,
      password: password
    })
  .then(function (res) {
    console.log(res)
    if(res.status === 200){
      dispatch({type: USER_SET, payload: res.data.user})
      cookies.set("token", res.data.jwt, {path: "/"})
      }
    }).catch(function (err) {
          setError("There was an error. Please try again");
          setError(null);
    })
  }

  const getCompanyEmployees = async (companyName) => {
    const token = cookies.get("token", [])
    const data = await axios.get(`${backBaseUrl}/api/users?populate=%2A&filters[Company][$eq]=${companyName}`,{
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(
        function (res) {
          if (res.status === 200){
            dispatch({type: GET_COMPANY_EMPLOYEES, payload: {res : res.data}})
            return res.data

          }else {
            setError("There was an error. Please try again");
            setError(null);
          }
        }
    )
  }
const updateUser = async (userData) => {
  const token = cookies.get("token", [])
  const {email, username, userAvatar, password, linkedInUrl, phoneNumber, emp_id, designation} = userData
  const formData = new FormData()
  formData.append("username", username)
  formData.append("email", email)
  formData.append("UserDesignation", designation)
  formData.append("LinkedinUrl", linkedInUrl)
  formData.append("PhoneNumber", phoneNumber)
  const user_id = state.companyEmployees[emp_id].id
  console.log(state.companyEmployees[emp_id])
  if(password){
    formData.append("password", password)
  }
  if (userAvatar){
    const formDataImage = new FormData();
    formDataImage.append("files", userAvatar);
    formDataImage.append("refId", user_id);
    formDataImage.append("ref", "user");
    formDataImage.append("field", "userAvatar");


    await axios.post( backBaseUrl+"/api/upload", formDataImage).then((res)=>{
      formData.append("userAvatar", res.data[0].id)
    }).catch((err)=>{
      toast.error(err.message)
    })
  }
  await axios.put(`${backBaseUrl}/api/users/${user_id}`, formData).then((res)=>{
    toast.success("Profile Updated")
    setTimeout(()=>{
      window.location = frontBaseUrl+"/employes"
    }, 1000)
  }).catch((err)=>{
    toast.error(err.message)
  })

}
  const updateProfile = async (userData) => {
    const token = cookies.get("token", [])
    const {email, username, userAvatar, password, linkedInUrl, phoneNumber, pageUserId, designation} = userData

    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("UserDesignation", designation)
    formData.append("LinkedinUrl", linkedInUrl)
    formData.append("PhoneNumber", phoneNumber)
    if(password){
      formData.append("password", password)
    }
    if (userAvatar){
      const formDataImage = new FormData();
      formDataImage.append("files", userAvatar);
      formDataImage.append("refId", pageUserId);
      formDataImage.append("ref", "user");
      formDataImage.append("field", "userAvatar");


      await axios.post( backBaseUrl+"/api/upload", formDataImage).then((res)=>{
        formData.append("userAvatar", res.data[0].id)
      }).catch((err)=>{
        toast.error(err.message)
      })
    }
    await axios.put(`${backBaseUrl}/api/users/${pageUserId}`, formData).then((res)=>{
      toast.success("Profile Updated")
      setTimeout(()=>{
        window.location = frontBaseUrl+"/profile"
      }, 1000)
    }).catch((err)=>{
      toast.error(err.message)
    })

  }



  const getUser = async () => {
      const token = cookies.get("token", [])
    const data = await axios.get(`${backBaseUrl}/api/users/me?populate=%2a`,{
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then((res)=>{
      dispatch({type: USER_SET, payload: res.data})
    }).catch((err)=>{
      setError("Forbidden User");
      setError(null);
    })
  }

  const registerUser = async (userData) => {
  const {email, username, password, LicenceCode, Company, userAvatar, linkedInUrl, phoneNumber} = userData
    const formData = new FormData();
    formData.append("files", userAvatar);
    formData.append("refId", "6");
    formData.append("ref", "user");
    formData.append("field", "userAvatar");

    const  data  = await axios.post( backBaseUrl+"/api/upload", formData).then((function (res) {
      const fileId = res.data[0].id
      return axios.post(`${backBaseUrl}/api/auth/local/register`, {
        email,
        username,
        password,
        LicenceCode:LicenceCode,
        Company,
        UserType : "HR",
        UserDesignation: "HR",
        userAvatar: fileId,
        LinkedinUrl:linkedInUrl,
        PhoneNumber : phoneNumber
      })
    }))
        .then(function (res) {
          console.log(res)
          if(res.status === 200){
            dispatch({type: USER_SET, payload: res.data.user})
            cookies.set("token", res.data.jwt, {path: "/"})
          }
        }).catch(function (err) {
          setError("There was an error. Please try again");
          setError(null);
        })
  }

const addEmployee = async (userData) => {
  const {email, username, password, designation, userAvatar, linkedInUrl, phoneNumber, userSalary} = userData

  const formData = new FormData();
  formData.append("files", userAvatar);
  formData.append("refId", "6");
  formData.append("ref", "user");
  formData.append("field", "userAvatar");


  const  data  = await axios.post( backBaseUrl+"/api/upload", formData)
      .then(function (res) {
        const fileId = res.data[0].id
        return axios.post(`${backBaseUrl}/api/auth/local/register`, {
          email,
          username,
          password,
          LicenceCode:state.user.LicenceCode,
          Company: state.user.Company,
          UserType : "Employee",
          UserDesignation: designation,
          userAvatar: fileId,
          EmployeeSalary : userSalary,
          LinkedinUrl : linkedInUrl,
          PhoneNumber : phoneNumber
        })
      })

      .then(res =>{
        if(res.status === 200){
          toast.success("User has been added")
        }

      }).catch(function (err) {
        setError("There was an error. Please try again");
        setError(null);
      })

}
const removeEmployee = async (user_id) => {
    await axios.delete(`${backBaseUrl}/api/users/${user_id}`).then((res) => {
      if (res.status === 200){
        toast.success("Employee Removed Successfully")
        setTimeout(()=>{
          window.location = frontBaseUrl + "/employes"
        }, 1000)
      }
    })
}
const getTasks = async () => {
    let url = ""
    if(state.user.UserType === "HR"){
      url= backBaseUrl+`/api/tasks?populate=%2a&filters[Company][$eq]=${state.user?.Company}`
    }
    if (state.user.UserType === "Employee"){
      url = backBaseUrl+`/api/tasks?populate=%2A&filters[AssignedTo][$eq]=${state?.user.username}&filters[Company][$eq]=${state.user?.Company}`
    }
    await axios.get(url).then((res)=>{
      if (res.status === 200){
        dispatch({type: SET_USER_TASKS, payload: res.data})
      }
    }).catch((err)=>{

    })
}


const completeTask = async (id, submittedFile) => {
    let uploadedFileId = ""
   if(submittedFile){
     const formData = new FormData();
     formData.append("files", submittedFile);
     formData.append("refId", "6");
     formData.append("ref", "task");
     formData.append("field", "SubmitedFiles");
     await axios.post( backBaseUrl+"/api/upload", formData).then((res)=>{
       uploadedFileId = res.data[0].id
     }).catch(()=>{
       toast.error("Something went wrong")
     })
   }
  const data = {
      "isCompleted" : true,
  }
  if (uploadedFileId){
    data.SubmitedFiles = uploadedFileId
  }
    await axios.put(`${backBaseUrl}/api/tasks/${id}`, {
      data: data
    }).then((res)=>{
      if (res.status===200){
        toast.success("Task Status Updated")
        return true
      }
    }).catch((err)=>{
      toast.error("Something went wrong")
    })
}
const reOpenTask = async (id) => {
  await axios.put(`${backBaseUrl}/api/tasks/${id}`, {
    data: {isCompleted : false}
  }).then((res)=>{
    if (res.status===200){
      toast.success("Task Status Updated")
      return true
    }
  }).catch((err)=>{
    toast.error("Something went wrong")
  })
}
const removeTask = async (id) => {
    await axios.delete(`${backBaseUrl}/api/tasks/${id}`).then((res)=>{
      if (res.status===200){
        toast.warning("Task has been removed")
        return true
      }
    }).catch((err)=>{
      toast.error("Something went wrong")
    })
}

const addTask = async (data) => {
    const {taskName, taskDueDate, taskDescription, taskAssignTo, taskAttachment} = data
  let uploadedAttachmentId = ""
  if (taskAttachment){
    const formData = new FormData();
    formData.append("files", taskAttachment);
    formData.append("refId", "1");
    formData.append("ref", "task");
    formData.append("field", "TaskAttachment");
    await axios.post( backBaseUrl+"/api/upload", formData).then((res)=>{
      uploadedAttachmentId = res.data[0].id
    }).catch(()=>{
      toast.error("Something went wrong")
    })
  }
    const taskData = {
      TaskName: taskName,
      TaskDescription: taskDescription,
      AssignedTo : taskAssignTo,
      Company : state.user.Company,
      DueDate: taskDueDate,
      isCompleted : false,
    }
  if(uploadedAttachmentId){
    taskData.TaskAttachment = uploadedAttachmentId
  }
    await axios.post(`${backBaseUrl}/api/tasks`, {
      data : taskData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if (res.status === 200){
        return true
      }
    }).catch(()=> toast.error("Something went wrong"))
}

  const EditTask = async (data) => {
    const {taskName, taskDueDate, taskDescription, taskAssignTo, taskAttachment, task_id} = data
    let uploadedAttachmentId = ""
    if (taskAttachment){
      const formData = new FormData();
      formData.append("files", taskAttachment);
      formData.append("refId", task_id);
      formData.append("ref", "tasks");
      formData.append("field", "TaskAttachment");
      await axios.post( backBaseUrl+"/api/upload", formData).then((res)=>{
        uploadedAttachmentId = res.data[0].id
      }).catch(()=>{
        toast.error("Something went wrong")
      })
    }
    const taskData = {
      TaskName: taskName,
      TaskDescription: taskDescription,
      AssignedTo : taskAssignTo,
      Company : state.user.Company,
      DueDate: taskDueDate,
      isCompleted : false,
    }
    if(uploadedAttachmentId){
      taskData.TaskAttachment = uploadedAttachmentId
    }
    await axios.put(`${backBaseUrl}/api/tasks/${task_id}`, {
      data : taskData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if (res.status === 200){
        return true
      }
    }).catch(()=> toast.error("Something went wrong"))
  }
  return <MainContext.Provider value={{
    ...state,
    userLogin,
    backBaseUrl,
    registerUser,
    addEmployee,
    getCompanyEmployees,
    updateUser,
    removeEmployee,
    getTasks,
    updateProfile,
    loading,
    setLoading,
    removeTask,
    completeTask,
    reOpenTask,
    addTask,
    EditTask
  }}>{children}</MainContext.Provider>;
};
export default Store;
