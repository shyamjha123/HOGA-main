import React, { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/Firebaseconfig";
// console.log(database);

function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  console.log(email);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(database, email)
      .then((data) => {
        alert("check your email", data);
        navigate("/Loginpage");
      })
      .catch((err) => {
        alert(err.cde);
      });
    // You can perform any validation or authentication logic here

    // Reset the form
    setEmail("");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        // flexDirection:"column"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1>Forgot Password?</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 15,
            // backgroundColor:"green",
            // elevation:'10px'
          }}
        >
          <label style={{ fontWeight: "bolder" }}>Email</label>
          <input
            // name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{
              width: "90%",
              height: "35px",
              paddingLeft: "10px",
              borderRadius: "8px",
            }}
            placeholder="Enter your email id: "
          />
          <button
            style={{
              width: "96%",
              height: "35px",
              color: "white",
              fontsize: "10px",
              fontWeight: "bold",
              backgroundColor: "rgb(173, 216, 230)",
              borderRadius: "8PX",
            }}
            type="submit"
          >
            Reset your password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forgotpassword;
