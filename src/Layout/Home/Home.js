import React, { useState, useEffect } from "react";
import Employee from "../../component/Employee";
import Navigation from "../Navbar/Navigation";
import { getCookie } from "../../Databse/Db";
import "./home.css";
// import Login from "../Login/Login";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [elpData, setElpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  // const [isView, setIsView] = useState(true);

  let a = getCookie("isAuthenticate");
  console.log(a, "hello auth user");

  // const auth = currentUser().then((res) => {
  //   setIsView(res);
  //   console.log(res, "homeeeeeeeeee");
  // });

  // const authUser = () => {
  //   currentUser();
  // };

  // const viewStatus = (event) => {
  //   setIsView(true);
  // };

  useEffect(() => {
    const fetchElpData = async () => {
      const response = await fetch(
        "https://emst-b9ce9-default-rtdb.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedEmpData = [];

      for (const key in responseData) {
        loadedEmpData.push({
          id: key,
          name: responseData[key].name,
          des: responseData[key].des,
          dep: responseData[key].dep,
          no: responseData[key].no,
          email: responseData[key].email,
          gen: responseData[key].gen,
        });
      }
      console.log(responseData);
      console.log(loadedEmpData);
      setElpData(loadedEmpData);
      setIsLoading(false);
    };
    fetchElpData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (!a || a == "false") {
    return <Redirect to="/login"></Redirect>;
  }

  //   if (!isView) {
  //     console.log('no user')
  //     return(
  //     // <Login></Login>
  //     <Redirect to='/login'></Redirect>
  //     // <section className="EmpLoading">
  //     // <p>Loading...dhruvil</p>
  //   // </section>
  // );

  //    }

  if (isLoading) {
    return (
      <section className="EmpLoading">
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="EmpError">
        <p>{httpError}</p>
      </section>
    );
  }

  const empList = elpData.map((emp) => (
    <Employee
      key={emp.id}
      id={emp.id}
      name={emp.name}
      email={emp.email}
      no={emp.no}
      des={emp.des}
      dep={emp.dep}
      gen={emp.gen}
    />
  ));

  return (
    <div>
      <Navigation></Navigation>
      <div className="home-emp">{empList}</div>
    </div>
  );
};

export default Home;
