import React from "react";
import { Grid, Paper } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { database } from "../firebase/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import Jodi from "../assets/istockphoto-1435794871-170667a.webp"



function Signuppage() {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
    username: Yup.string().required("Username is a required field"),

  });
  const getData = (values) => {
    console.log(values.email);
    console.log(values.password);
    console.log(values.username);

  localStorage.setItem('Username', values.username);

    const setemail = values.email;
    console.log(setemail);
    const setpassword = values.password;
    console.log(setpassword);

    createUserWithEmailAndPassword(database, setemail, setpassword)
      .then((data) => {
        console.log(data, "authData");
        const user = data.user;
        sendEmailVerification(user);

        // console.log("success");
        alert("Verify your email id from your registered email");
        navigate("/Loginpage");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

    <div>
    <nav class="navbar bg-white">
      <div  style={{display:"flex", flexDirection:'row', gap:"30px"}} >
       
          <img
            style={{
              backgroundColor: "transparent",
            }}
            onClick={() => {
              navigate("/");
            }}
            src={Logo}
            alt="Logo"
            width="70"
            height="74"
            border="none"
            class="d-inline-block align-text-top"
          />
          <p style={{color:"#DC3545", display:'flex', fontSize:"30px", fontWeight:"500", alignItems:'center', justifyContent:"center"}}>Hogamilan</p>
  
    
      </div>

    </nav>
  </div>

      <Grid container spacing={0} style={{ height: "100vh" }}>
        {/* Left section on small screens */}
        <Grid item xs={12} sm={6}>
          <Paper style={{      height: "auto", padding: "20px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={Jodi}
            />
          </Paper>
        </Grid>

        {/* Right section on small screens */}
        <Grid item xs={12} sm={6}>
          <Paper
            style={{
              height: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "500" }}>
              Sign in to continue to
              <span style={{ color: "#DC3545" , fontFamily:"sans-serif"}}> Hogamilan.</span>
            </span>
            <Formik
              validationSchema={schema}
              initialValues={{ email: "", password: "", username: "" }}

              onSubmit={getData}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <div>
                  <form noValidate onSubmit={handleSubmit}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <label style={{ fontSize: 18, fontWeight: "700" }}>
                        Username
                      </label>
                      <input
                        style={{
                          width: "80%",
                          height: "40px",
                          paddingLeft: "10px",
                          borderRadius: "8px",
                          borderColor: "white",
                        }}
                        type="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Enter username"
                        id="username"
                      />

                      <p
                        style={{
                          margi: "0 0 10px 10px",
                          textAlign: "ceter",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.username && touched.username && errors.username}
                      </p>
                    </div>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <label style={{ fontSize: 18, fontWeight: "700" }}>
                        Email
                      </label>
                      <input
                        style={{
                          width: "80%",
                          height: "40px",
                          paddingLeft: "10px",
                          borderRadius: "8px",
                          borderColor: "white",
                        }}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Enter email id "
                        // className="form-control inp_text"
                        id="email"
                      />
                      {/* If validation is not passed show errors */}
                      <p
                        style={{
                          margi: "0 0 10px 10px",
                          textAlign: "ceter",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <label style={{ fontSize: 18, fontWeight: "700" }}>
                        Password
                      </label>

                      <input
                        style={{
                          width: "80%",
                          height: "40px",
                          borderColor: "white",
                          paddingLeft: "10px",
                          borderRadius: "8px",
                        }}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter password"
                        // className="form-control"
                      />
                      {/* If validation is not passed show errors */}
                      <p
                        style={{
                          margi: "0 0 10px 10px",
                          textAlign: "ceter",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>

                    {/* Click on submit button to submit the form */}
                    <button
                      style={{
                        width: "83%",
                        borderColor: "white",
                        // height:"50px",
                        backgroundColor: "#DC3545",
                        height: "50px",
                        color: "white",
                        paddingLeft: "10px",
                        borderRadius: "8px",
                        boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)"
                      }}
                      type="submit"
                    >
                      Sign up
                    </button>
                    <div
                      style={{
                        display: "flex",
                        // textAlign:"center",
                        paddingLeft: "40px",
                        // justifyContent: "center",
                        // alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    ></div>
                  </form>
                </div>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>

      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            // gap:"px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              height: "100%",
              // height:"100%",
              // backgroundColor: "red",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "700" }}>
              About <span style={{ color: "#DC3545" }}>Hogamilan</span>
            </span>
            <span>Discover lasting connections with</span>
            <span>Hogamilan.com, your trusted</span>
            <span>matrimony platform. Explore</span>
            <span>personalized matchmaking and</span>
            <span>matrimonial services for a</span>
            <span>meaningful journey to love.</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                gap: "20px",
              }}
            >
              <img style={{ width: "40px" }} src={facebook} />
              <img style={{ width: "40px" }} src={instagram} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "25%",
              height: "100%",
              marginBottom: "90px",
              flexDirection: "column",
              // backgroundColor: "green",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "700" }}>
              Quick <span>Links</span>
            </span>
            <span>About Us</span>
            <span>Blog</span>
            <span>Contact Us</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "25%",
              height: "100%",
              marginBottom: "90px",
              // backgroundColor: "blue",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "700" }}>Policy</span>
            <span>Disclaimer</span>
            <span>Privacy Policy</span>
            <span>Terms of service</span>
            <span>FAQs</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "90px",
          backgroundColor: "#DC3545",
          height: "60px",
          // marginTop: "150px",
        }}
      >
        <p style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
          Copyright © 2024 - Hogamilan - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Signuppage;
