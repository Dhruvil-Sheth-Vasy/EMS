// import React from "react";
import { getDatabase, ref, set, child, get } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // reauthenticateWithCredential,
  // onAuthStateChanged,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { Redirect } from "react-router-dom";
// import Login from "../Layout/Login/Login";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const URL = "https://emst-b9ce9-default-rtdb.firebaseio.com/users/";
const js = ".json";

const firebaseConfig = {
  apiKey: "AIzaSyCXThQcyO0_n2Hhl2G5-c25SSgOvGR6Yak",
  authDomain: "emst-b9ce9.firebaseapp.com",
  databaseURL: "https://emst-b9ce9-default-rtdb.firebaseio.com",
  projectId: "emst-b9ce9",
  storageBucket: "emst-b9ce9.appspot.com",
  messagingSenderId: "534860444690",
  appId: "1:534860444690:web:fce295552e1b61501414cb",
  measurementId: "G-VVW0KR66V4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export function writeUserData(name, gen, email, no, dep, des) {
  const db = getDatabase();
  console.log("hhhh");
  set(ref(db, name), {
    name: name,
    email: email,
    no: no,
    dep: dep,
    des: des,
    gen: gen,
  });
}

export const authNewUser = (email, pass) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  // const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      // console.log(userCredential);
      const user = userCredential.user;
      // console.log("hello", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const authExistingUser = async (email, pass) => {
  const auth = getAuth();
  let d = true;
  await signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      console.log(d, "api check done");
      d = true;
      return d;
      // window.location.replace("http://localhost:3000/home");

      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "yyh4hyh4yh", errorMessage);
      // let er = false
      // d = er
      d = false;
      return d;
    });

  return d;
};

export const getFirbaseData = async (name) => {
  let d = "";
  const dbRef = ref(getDatabase());
  await get(child(dbRef, name))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const a = snapshot.val();
        console.log(a);
        // const a = []
        d = a;
        return a;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("print d", d);
  return d;
};

export const postEmpData = async (name, email, no, des, dep, gen) => {
  await fetch(URL + js, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      no: no,
      email: email,
      gen: gen,
      des: des,
      dep: dep,
    }),
  });
};

export const deleteEmployee = async (event) => {
  console.log(event);
  console.log(event.target.id);
  const id = event.target.id;

  const response = await fetch(URL + id + js, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  window.location.reload();

  console.log("employee deleted.");
};

export const signOutUser = async (event) => {
  const auth = getAuth();
  await signOut(auth)
    .then(() => {
      console.log("user logged out successfully.");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

// export const reAuthenticate = async (event) => {

//   const auth = getAuth();
//   const user = auth.currentUser;

//   // TODO(you): prompt the user to re-provide their sign-in credentials
//   // const credential = promptForCredentials();

//   reauthenticateWithCredential(user, credential).then(() => {
//     // User re-authenticated.
//   }).catch((error) => {
//     // An error ocurred
//     // ...
//   });
// }

export const currentUser = async (event) => {
  let a = "";
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);
  if (user) {
    let d = true;
    a = d;
    console.log("user exist");
    // return a
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   // ...
  } else {
    // No user is signed in.
    let f = false;
    a = f;
    console.log("user not exist");
    // return(<Login></Login>)
    // return a
  }

  return a;
  //  onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // console.log(user)
  //     console.log("sign in user ", user);
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     a = true

  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     a = false
  //     console.log("no user sign in", user);

  //     // return (<Redirect to='/login'></Redirect>)

  //   }

  // })
  // }
  // console.log(a, 'end of check')
};

// firebase
//   .auth()
//   .currentUser.getIdToken(/* forceRefresh */ true)
//   .then(function (idToken) {
//     // Send token to your backend via HTTPS
//     // ...
//   })
//   .catch(function (error) {
//     // Handle error
//   });

// export const checkUser = ()=> {
  
  export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie)
    let ca = decodedCookie.split(';');
    console.log(ca)
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length))
        return c.substring(name.length, c.length);
      }
    }
    return "";
  // }


} 


export function setCookie(cName, cValue, expDays, op) {
  let date = new Date();
  if(op === 'create'){
    date.setTime(date.getTime() + (expDays*15* 60 * 1000));
  } else {
    date.setTime(date.getTime() - (expDays*15* 60 * 1000));
  }
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}