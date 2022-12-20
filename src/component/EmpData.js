import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { postEmpData } from "../Databse/Db";
import "./EmpData.css";

const femaleURL =
  "data:image/jpeg;base64,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";
const maleURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADhCAMAAADmr0l2AAABblBMVEX////mOx/W4+sdGDj0qYHjjGHOdU0AADMAFTn3q4L7roQAFjnY5e3T4erlLQD+sIXtPB0YFTfkIADjkGTlNBPlMAsABTTkhlYUFzgACTTji2Dl7/boflfV6vMODzbTeE7MZTV2U1KluL/+9/b0sapiRUvI1t7wPR3qX03AhW3jnXvw9Pf86efvjYL3ysX86ObraFj2wbvwl43508+QKi1UIDTaOSHypp6mdGONYlrbmHjFiW84KT/voHbMaj/atarZ09K1xc3sdWb0t7DuhnrENCWbLCwnGTfTNyKpLyo7HDbpWEXoSjN6JjC5MidVPUeGXlhDMEKdbWAAACPlVjboeU+uZEjayMLcs7PgoobenpvesZ/rb2FHHjVqJDJbITOAJy/DfVyTXE7lZkMfCy6kn6daVWdzbn3Iw8k2PFe2tr8AABs2OFFbO0L/4NH4wad5eor4vqHKXirolHvFQy6AS0LbWjhwQkHfko3bu716j9qMAAARhUlEQVR4nO2di1/TShbH20AJSZ/pIyWBprdCwZaHKIqlUC2IVgUFqoiv615x1737uNfd63rV/37nkaTpi86ZpLR+Pvl9/Cg2pcm3Z+acMzMnk0DAly9fvnz58uXLly9fvnz58uXLly9f46n5lY2169fvLSDdu359bWNlftRX5JVWNhZW3x4mkWIO4f8fvl1d2FgZ9fW50crajfU04sqkgz2VziDQ4PqNtR/RmvNrq4fJvmidmIerPxbktYWrCG4wW0sIcn3hB2muK7cPkjEGy3VZMpY8WBh/O15f56KzGd+ujZrgIq3cyPDTmYzJ4I1xNePGXhLU7/opk9y/NmqWHtq4mnRpvJbSyfWNUfN0yEs8E3GcrHht3Vs8irg3LmFjft97PIp4Y9RoRPdgIR2iWOb6qOkC1w6Sw8LDSq6PuJ3eHk7rbCmdXBgh3spBbLh4WMmrIwv894ZtPqp0ckQ9cW+ovc+p5P4I8K4dDs15dit2cOnNdI25eSYSS4ngJhb6eSmRSPAQpmOXnLvdZmueCOf+gyc/N2amscIzjZ/f3Xz6cIkH83K96T4TXyLx9F0YYc1M2JqZCaNXEOaj+5sYH8CZXL08vnWm6JB41Jh2sE10YE7PPP7LLw+ePgwuMWLG9i6L74DFvSQePp7uSefknEGc4cfvHtwPskDGrl4K3vwhi3tZetTHej3tOR2+9SA4GDFzcBl8myx8iUeDzNdJGQ7fZCA8HBe++0A+rPDjzYGI6aHbkKl9BoNwPGzFmYcDCYfdSg+Y+JaehPkIw5sDPzuzPky+dbb0jKeBUsLHgz98mNFin210tPSY1YF2KfxkaeDHD28mgzU/g3pQp6bvDz5B8t5w+NYYh0cJfgOiRnprsAmDyaFk3iusfE9dGJDNhMHYMEZPjAEiuPSzCwMiEz5hSNqGEQ73WMe3D10ZEIkl9Y55PrS4xzo/kfiFLwbamn7Icpqkx8tsrB0QyVUDRQo/Yho9edwN2TKYoMsYQQEZkm6ktKcZzW3m+U9AkFcMTdUMpfPlmV/Yxr9eRsNrzA20R4xQNFEUVaMTTlSPtiqVSmFH7EBkBfSykV5lnuDtCvKGuLNVqlYrBUNVDUNBMgxVVHeOS5NxWZZkWd7e0XiaKGqkb73iY/agXT1QEYvVuCwhyfFqaatwdHJyVDiubCM4adKUJBfENsAHrDNRXnnSefYZ3g4DGhPb8RYIMlccCdnNfo0qfqw6Adm8KJE3gKvsgO09UCxOdqD0UfzI0UWZcjWq2G0v+Ng9TDDxxGlAsRBnwkPGLTsaKVugp0p64Wfesi8hJZz2U5n5JiflZsvRTA8e1dvKeLAqswFYQ3KmocaRzMyH1OqF0+znQyZ0X4uxDjDgI0caKpbZ+p9pwmO7F05Dli3SrucvIAZM3GxZUKyADChVVS5A9yYEGDCYeGf7GKUB4kMm3LESGlATdW1CiAGDiVs2oAozIALcstooxIsiJd2VYexBVuEdgCIMD7XRbStSAOIgVsbV0BcwDGwDVI7YQ4QlCxCSyWC5yrlvgNbhW4BaE9hCUTZjdUKmSRknoJt0BlYG03IyYgkSI4jkgh0ooMvb/HzXgYD2dIxYhQPaycz0Uxifi1lSSIzAgA9sQFCUJ5JKdidkHRCa4o8UMBcTdAwmVCgeTritUA/thPxuhn0mxtSmBShaBsSDwK7xn4PKcVhuWF7mHRSQd3aGeSrNUqJhRokJ6kRluVppNiulqiz3YJRkCR9ulsoyfrvtZcAW5J1gA7dQ240qJ/iKpclmQ1U1TVNVo7AtdwQOWSoVVBEfFtWdCrKi3QmngX2Qe1gIbqH2cILE+fi2otoTZoaIINoAmxOiHRcUcacq20MmaKTnbqPsc2m2zE5oFOTJeAVZTsSik5+KWnDYUD7Cs4V4ZpS+RVVLstVGgblakNePznNUSyboypK2hRqgVmyWtpFKlWZhBzdGZ2xEhxHaSaFZwW/ZrmwVtaq8TU0IG04QxXgAgVGeAj4QDWQGtSRJ28Q/khlDWY5PbjerbZ1Q3q5sS/HWe+JSVYqfYKtqjxmWQDvEFesBk2ktPXwfOjdIItPhNqVOP9r9AnEzym+h0AdwKWKGZ9n+kIMvPRcKvdAmDPvaa7UaMhL6uztKkIPIvI6DaNSrneuhFPjUPAui8CCBlQqF3qtGMW4RlCvHxeJxCTH24JOkEj5ambQQ5WNDfR8KpT6Az8sRKHi6YPAwFdJDogVYKxefqYZiGNpfqz2GT/K2ho4iT/qsYDZouWiIIaQ5sP/m6ISwoaCp58iCumJOyCAA7W8fkd8w/v7rP7rHT3LlH79+NPDRvz1TqYdF2VpDR4A6GJBjUMgRBYPBDxjwRBHL2GmUjY/z88+w4382H/hnuYNPqv4amP8XjvJaYPnfDXK4LCq/YcAQ+NwckZDrlg8C+JsibmODSPHfKQICnA986gT8FJhfpkcDgd9Jm5a2ReMrBkzBv9w0lA+wItENiAI97YS/Bz5qqAv+PTD/3y4vU/s0H/iooqP/CXyiB+UtzfiKDZiCV+aDvcwavwW/GvacU036dFwoFtb+W+s1Yqp9WkMHtz5Zw6n4kWJ8CfFZEOxl4Jm2BRj6YjhmDXEe02us1POoOGGc8/VBeL69z3Vb0p/YgjiVgU860UkL7ZzPi8JzGS4nSsPEuUaGE2DhBRgKCI+DcDfKg0cCPQFUFB7ACWVCe8ELCE3WOO8sw4AoGZ2ggQIkMnmvvQ9xpWrgOMGXiQbT+Pt/j4Z1xjHYhGSJUOUGTMIAQatKDsA5E9AxoGC2IB7PiwTwOQ8gbJVpg/PeVRQn9Pciz+Q9nXMiuXaK58zAQMg1lghSNxoSedaXUJTHkx0YMMvjwYE3GC7w3n2Mx0tk7kiFLU9IVTppiH6dqwsGY7AbffkSGdoJdTJFbY96GQ1YxF+LsqNzdkFoKsMLSDrhCZkOVSGRQqIzasoJAtS5boKNwe4Q5RruEiFA0psmlAYEkC5/4uEgXwu9NMDEhxQaTtAlpq3OWKjf0fE/NT3VcUBu0ilRPBzk8qHgMT2/BYN66gsFVJROE+r5fH5yMnTnzp2O0aGk0El+NFpK/TnugMHTc3Ottme+VpvsnmCzSyxQrv2cc3eFS+uDjrJm1VxvkUidKJ7GluV4uWz+QF4y31Ax112mH3FvHgEE5PaiWNbddWathVwqnOzs7JwUC83m8QlZkWgeF8lLhRJ9h7U+D193GQmgtdCrkXInuaiSWm1crK1qhob+WOXbiqEWyVtsCwJKKTsBYXGQO5PBSpi1CCQfNcvsFE1UjcbOUXFrq3h00jBUUWtFy9baJ3zdxQaEZTK8uSiRde8EKSaRt3DzM5RmdVKupbJ6TQplsylpstpUsLM1cCyx8rQZjoUlGxCWi/KOJoislWwN9y+SRGtFRKffcSgfqk0WNZy7kIyO9kFw+YFDwNEE53jQBLxJ2qiyg68dD/OUk9rnn/744yen/vhjKoVzOg13wjjN7qAVMm2AsPEg54jeBKRxgoyYSL25WK19no3Uz87uWjo7q8/W53DLJDVDdKw0EX7qAhDExz0nQ0XdKLEgjuGYdG6uPtuuN6c1zEWyAbMSz4UTBc/duziVXS8jluIkhuN4WDs9/XzWoqu/mTvVUXjQSOls3PSiDX4DgmfV+OZFLUDz/gmxIsULBjWSPjd3eqp/foP06jP6cW6OmtcoxKWK6UShFUBOQOi86L6rHZusXEZVi4pVmocIMSMW/mlu0uygSlG1wjx/HgOf2XaVygSX3llVa7hvmSsVoTmHQvQ10XwL4fsLfxSEr03wrS615LxLy16KCXXgteqYcQNtuDkfeHXJVZxA2my0CJ3VozVnxYXznqWZhiu/Bq9CcLup32bLho45UkmWHAUyrSJYlKW54uOoa3blRoluWfW/rQk2qVpBsicU43addviWu3NxrNG7GfJSJX6x62OtKhI0LkKybhqRq/a9Ei4CBBFHlYVbLxPEG1eFzfpRo2xWyGKTWYuHctmciZkJP3LhP4k46mR4ig07ldj82SwgRWNf3PXI5BKZjJJklMZQvvDjwTsdDQQE8/HVqnUj3pymFOLEVlWOH5NhkVaIy9WtBm2fCrzAt1tpnh3XuKoNu7T0P/MucjSkR2i0y+EVUtN82s7/3DZPpAzP3S8edEKs5/kvmpWr2BXO9gvql7wXLYWrXtSLToj0fCo/9ZvasduBiacdoYNeAHJV/ELve+mj51NTU/kXDa2bT2u8yKODXGtJ7eK898XVzJqtP6cwYf5c6djNwlDO85jPC0DgjJolt+koFQFEiFNfFK3VBzXly1SeHvEAkPd2evCdL71kAmLE8x2VxkF159zCm5riXGxxiHvXDk/a6IcpW/n8i68NVW18fZHPt151D8jZQj1KZu5MTTkR8+ZfLf3kHpD7JlfALg99AdtgeumO20Qmzb/fA+teeBcppQ8idHsGN/vkubcgrsMfMqCbXWPdTT1hkRLZi5upyzgBXBhsl2s3kz7FpUsXG5GvqqIF6GpPGb7C35YSIVMXGdGVl+G6baklvuL7lkjt2iAjukq3Xe5l4TJSkPLKQYj5UxfncBEjqFwtFJIS50GIed7SHyL3WwK5MWGbAfsgctZoW2dwv6mTi16YPk11AiLEfCdeKJTibqRueyAWaEuZNs314DMhiXTdeiF1yudJ3W0mY4q3Pv253o+vh1I66w67bfJm/8YbPHcrB3s1zwsRTzPgaTxvdsbjyEhjmQ8pIF8olD37FgN+lV49u+A6bOOjWPB1PQvFQ4BCTvgGegKld9ttA+bXMsmDl7lcLqQPJmqXXs4JQu7KywPmxwFlvNv0ntXPpGOZ1fruYkTIvQEDZu9GhMjibi53th9jM6OX2xgvMBCmY7G3LyM5dJERQYC30awgCBH85URywst1BkZvHxg2aDmU0Am5HL7KK+ivXBloQv1VDv8q+m7wb+eE14Med+thA8Wav8C/pZFn2DfpbDOcAU2YrQsCNb5gMb7c6/8YbXRWj7e77+NJEVzs6rfvuZx9ZYIQxXYAmtA0YNTxMYgx8v3bQR9I7x9Y0P0wDdQskwhOaKOzTQjrhaQHLl5p/yD0Ejbkt4Pup4bHhvBQDcc8N7Zb7HDv9fdIJxy5KmrCNwDC7F1iwMXuD6OQ31/vbaJTpq1L4FrwHCSrG+JGufoaG64HXMuEQiTF3EhJDHT2wB6QucXvr/evxugTVb3ugFRk7BsLfsN268dGFb1C/skyEuopAtHeA3tTRr6vpmNebHzbUwvJTPB15GI2einEGKgbMhHqeh2/e7e/AdsohdfDe2Tm6r6QY7gIqzuxEepZwtftYfoptzwsvkBglvEaBIG0t0hdH0iopwhfdFADbWl2eHyBAOtFoAsW8HULtQG+NFsWyGf29qA9P3qYfIgwyngZi4QQR4sLjKiT+NA3QoyAj4OwXu6HqGdf1Un2Ok58IELarXJnCLGLUdez1To1X3Ss+AD9cNG88Eiu/iaUdUAiuGzqTZ0GHPtt48IH8jS7EXMAFKnffZXKmkq9umvSoea5y+4/L4kPEC3Q1S9GLBKUU9axhFZ6HkHms76DgYoONT50EDL2Q2TEFmL3QXyU2XyXyRcILLMS4i6GEbswIhHzCCvfEPOXnoSsgNROu4uYiNKQH1C6il5kxxMumS/A7mqosXavIJ7FxWhUiKJ/yP8EZrxLdC9OMXdEyhhd3N1FYAhtd3cx2qPR9tfldr+WlgUAotU0I3ZTZcYbQfO0xJrVuFF0JM3T0nJ0yIijNB/VcI04qt7nFHvA4NCozUc1O6x2OgbmMzUExOg4tE6HIt4ijhse0rKXVhw/PCJIavMD4mGh3MYlZDQaGQ/P2U/L7swYnR1vPKJlFPs5KNEvjbnxHFqOQBGjwo9gO6eWZ3HkYMCM4n73o9GZWqaU/TCjAmX7MeFsIcpZ1GKjTv9K/heZ/eHZ2rXs0KivxZcvX758+fLly5cvX758+fLly5cvX/31f8rolgDByjy0AAAAAElFTkSuQmCC";

const EmpData = (props) => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const history = useHistory();
  // let isMail = true;
  let path = "/home";

  const handleChange = (event) => {
    setIsSubscribed((current) => !current);
  };

  const empDataCheck = (event) => {
    const name = event.target[2].value;
    const email = event.target[3].value;
    const no = event.target[4].value;
    const dep = event.target[5].value;
    const des = event.target[6].value;
    const gen = event.target[0].checked ? "male" : "female";

    event.preventDefault();

    console.log(event);
    console.log(gen);
    postData(name,email,no,des,dep,gen)
    // writeUserData(name, gen, email, no, dep, des);
    history.push(path);
  };

  const postData = (name,email,no,des,dep,gen) => {
    console.log("posting...");
    postEmpData(name,email,no,des,dep,gen)
    // const submitOrderHandler = async (userData) => {
    //   console.log(userData);
    //   await fetch("https://emst-b9ce9-default-rtdb.firebaseio.com/.json", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: "kriya",
    //       sirName: "Pandya",
    //     }),
    //   });

    //   console.log("post data");
    // };
    // submitOrderHandler();
  };

  return (
    <div>
      <form className="empData-form" onSubmit={empDataCheck}>
        <div className="pic">
          <figure>
            <img src={isSubscribed ? maleURL : femaleURL} alt="Profile"></img>
          </figure>
          <div className="gen">
            <input
              type="checkbox"
              value={isSubscribed}
              onChange={handleChange}
              checked={isSubscribed}
              id="Male"
              name="Male"
            ></input>
            <label htmlFor="Male"> Male</label>
            <br></br>
            <input
              type="checkbox"
              id="Female"
              name="Female"
              checked={!isSubscribed}
              value={isSubscribed}
              onChange={handleChange}
            ></input>
            <label htmlFor="Female"> Female</label>
          </div>
        </div>
        <div className="emp-lab">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" minLength="4" required></input>
        </div>
        <div className="emp-lab">
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" minLength="4" required></input>

          <label htmlFor="MoNo">Mobile Number</label>
          <input type="number" id="MoNo" minLength="10" required></input>
        </div>
        <div className="emp-lab">
          <label htmlFor="dep">Department</label>
          <input type="text" id="dep" minLength="4" required></input>
          <label htmlFor="des">Designation</label>
          <input type="text" id="des" minLength="4" required></input>
        </div>
        <div className="btn">
          <button type="submit">Submit</button>
          <NavLink to="/home">
            <div className="btn">
              <button type="submit">Cancel</button>
            </div>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default EmpData;
