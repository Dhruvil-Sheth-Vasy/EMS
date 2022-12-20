import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./Layout/Signup/SignUp";
import Login from "./Layout/Login/Login";
// import logo from "./logo.svg";
import "./App.css";
import Home from "./Layout/Home/Home";
// import EmpData from "./component/EmpData";
import NewEmployee from "./component/NewEmployee";
import Page404 from "./component/Page404";
// import { getCookie } from "./Databse/Db";

function App() {

  // let a = getCookie()

  // if(!a) {
  //   return(
  //     <Redirect to='/login'></Redirect>
  //   )
  // }

  return (
    <div className="App">
      
        <Switch>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/addemployee'>
            <NewEmployee></NewEmployee>
          </Route>
          <Route exact path='/addemployee/:empId'>
            <NewEmployee></NewEmployee>
          </Route>
          <Route path='/'>
            <Page404></Page404>
          </Route>
        </Switch>
  
    </div>
  );
}

export default App;
