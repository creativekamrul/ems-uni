import React, { useContext } from "react";
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";
import { MainContext } from "../../state/Context";
import Cookies from "universal-cookie"
const Sidebar = () => {
  const { isUserSignedIn, user, frontBaseUrl } = useContext(MainContext);
    const cookies = new Cookies
  const logOut = () => {
    cookies.remove("token", [])
      setTimeout(()=>{
          window.location = `${frontBaseUrl}/signin`
      }, 100)
  }
  return (
    <div className={styles.container} fixed="left">
      <div className={styles.logo}>ETMS</div>
      <div className={styles.menu}>
        {isUserSignedIn ? (
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
              {
                  user.UserType === "HR" ? (<>
                      <li>
                          <Link to="/employes">Employes</Link>
                      </li>
                      <li>
                          <Link to="/add-employe">Add Employe</Link>
                      </li>
                  </>): ""
              }
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a href="" onClick={logOut}>Log Out</a>
            </li>
          </ul>
        ) : (
          ""
        )}
        {!isUserSignedIn ? (
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Sidebar;
