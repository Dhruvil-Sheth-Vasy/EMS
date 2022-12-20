import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { authExistingUser, app } from "../../Databse/Db";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/Index";
import { authExistingUser } from "../../Databse/Db";
import { setCookie } from "../../Databse/Db";

const Login = (props) => {

  const [isAuth, setIsAuth] = useState(false)



// Set a Cookie


// Apply setCookie


  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors,touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      console.log(values);
      loginCheck()
      action.resetForm()
      
    },
  });
  // console.log(errors);
  const history = useHistory();
  let path = "/home";

  async function loginCheck(event) {
    // event.preventDefault();
    // const email = event.target[0].value;
    // const pass = event.target[1].value;
    console.log(values.email, values.password);
    // const auth = getAuth();

   const authUser = await authExistingUser(values.email, values.password)
    console.log(authUser)
    if (authUser) {
      setCookie('isAuthenticate',true, 1, 'create');
      history.push(path);
    } else {
      alert("Incorrect Email ID/ Password.");
    }
    // signInWithEmailAndPassword(auth, email, pass)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // window.location.replace("http://localhost:3000/home");
        
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, "yyh4hyh4yh", errorMessage);
    //     alert("Incorrect Email ID/ Password.");
    //     return;
    //   });

    // authExistingUser(email, pass);
  };

  // setCookie(values.email, values.password, 1);


  return (
    <div className="s">
      <div className="signup">
        <div className="inner-signup">
          <h3>Login</h3>
        </div>
        <div className="outer-signup">
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email here..."
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.email && touched.email ? <p>{errors.email}</p> : null }
            </div>
            <div className="email">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                minLength="6"
                id="password"
                placeholder="Enter password here..."
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
               {errors.password && touched.password ? <p>{errors.password}</p> : null }
            </div>
            <p>
              New user,<a className='click' href="/signup"> Click here </a> for regestration
            </p>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
