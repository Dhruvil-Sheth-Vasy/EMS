import React from "react";

const Card = (props) => {
  return (
    <div className="employee">
      <figure>{/* <img src={maleURL} alt= 'profile'></img> */}</figure>
      <h4>{props.data.name}</h4>
      <div className="emp-dtl">
        <p>{props.data.email}</p>
        <p className="vl"></p>
        <p>{props.data.no}</p>
      </div>
      <div className="emp-dtl">
        <p>{props.data.dep}</p>
        <p className="vl"></p>
        <p>{props.data.des}</p>
      </div>
    </div>
  );
};

export default Card;
