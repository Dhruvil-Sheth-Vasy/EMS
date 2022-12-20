import React from "react";
// import { Redirect } from "react-router-dom";
import './Page404.css'

const Page404 = (props)=> {

 

    return(
        <div className="error-page">
            
         <h1 className="error-header">
          <a href="/login" className="error-ref" >Click Here</a><p></p> to go on Login Page
        </h1> 
        </div>
    )
}

export default Page404