// import { Form } from "formik";
import React from "react";
import { NavLink ,useHistory} from "react-router-dom";
import { signOutUser } from "../../Databse/Db";
import { setCookie } from "../../Databse/Db";
import './Navigation.css'

const Navigation = (props) => {
    const history = useHistory()
    const path = '/login'
    const signOut = () => {
        signOutUser()
        setCookie('isAuthenticate',false, 1, 'create');
        history.push(path)
    }

    return (
        <nav> 
            <ul className="nav-ul">
            <NavLink to='/home'>
                <li>Home</li>
                </NavLink>
                <NavLink to='/addemployee'>
                <li>Add Employee</li>
                </NavLink>
            </ul>
            <ul className="nav-ul-log">
                <li onClick={signOut}>Logout</li>
            </ul>
        </nav>
    )
}

export default Navigation