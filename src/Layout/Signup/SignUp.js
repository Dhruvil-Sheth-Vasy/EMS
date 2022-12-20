import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/Index";
import { authNewUser } from "../../Databse/Db";
import "./signup.css";
// import { getDatabase } from "firebase/database";

const SignUp = (props) => {
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        signupCheck();
        action.resetForm();
      },
    });

  const signupCheck = (event) => {
    const email = values.email;
    const pass = values.password;

    let path = "/login";

    authNewUser(email, pass);

    history.push(path);
  };

  return (
    <div className="s">
      <div className="signup">
        <div className="inner-signup">
          <h3>Register</h3>
        </div>
        <div className="outer-signup" >
          <form className='sup-form' onSubmit={handleSubmit}>
            <div className="email sup-grp">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>
            <div className="email">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
            </div>
            <div className="email">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password..."
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {errors.confirm_password && touched.confirm_password ? (
                <p>{errors.confirm_password}</p>
              ) : null}
            </div>
            <div className="btn">
              <button type="submit">Submit</button>
              <NavLink to='/login'>
            <div className="btn">
          <button type="submit">Cancel</button>
          </div>
          </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
