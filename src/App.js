import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import { Container } from "react-bootstrap";
import SignIn from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import 'react-toastify/dist/ReactToastify.css';
import AddEmployee from "./components/pages/Employe/AddEmployee";
import Employees from "./components/pages/Employe/Employees";
import React, {useContext} from "react"
import {MainContext} from "./state/Context";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/Profile/edit";
import EditEmployeeProfile from "./components/pages/Employe/EditProfile";
import EmployeeDashboard from "./components/pages/Dashboard/EmployeeDashboard";
import SingleTaskPage from "./components/pages/Dashboard/components/SingleTaskPage";
import AddTask from "./components/pages/Dashboard/AddTask";
import EditTask from "./components/pages/Dashboard/EditTask";

function App() {
    const {user, isUserSignedIn} = useContext(MainContext)
  return (
    <div className="App">
      <Container fluid>
          <Router>
              <div className="full_page">
                <div className={"sidebar"}>
                  <Sidebar />
                </div>
                <div className={"main_content"}>
                  <Routes>

                    <Route path="/tasks/:task_id" element={<SingleTaskPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Dashboard />} />
                      {
                          isUserSignedIn ? <>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/profile/edit/:user_id" element={<EditProfile />} />
                          </>
                          : <Route path="/" element={<h1>Signin to Continue</h1>} />
                      }
                      {
                          user.UserType === "HR"?(<>
                              <Route path="/tasks/edit/:task_id" element={<EditTask />} />
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/employes" element={<Employees />} />
                              <Route path="/add-employe" element={<AddEmployee />} />
                              <Route path="/add-task" element={<AddTask />} />
                              <Route path="/employes/edit/:emp_id" element={<EditEmployeeProfile />} />
                          </>) : user.UserType === "Employee" ? (
                              <Route path="/" element={<EmployeeDashboard />} />
                          ) : <Route path="/" element={<h1>Sign in to Continue</h1>} />
                      }

                    <Route path="*" element={<h1 style={{textAlign : "center"}}>Loading</h1>} />
                  </Routes>
                </div>
              </div>
          </Router>
      </Container>
    </div>
  );
}

export default App;
