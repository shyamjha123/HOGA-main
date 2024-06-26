import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import Logo from "../assets/logo.jpg";
import Jodi from "../assets/istockphoto-1435794871-170667a.webp"
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { database } from "../firebase/Firebaseconfig";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Loginpage({ setLoggedIn }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/");
    };
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const getData = (values, e) => {
    const setemail = values.email;
    const setpassword = values.password;

    signInWithEmailAndPassword(database, setemail, setpassword)
      .then((data) => {
        const user = data.user;
        const authToken = data.user.stsTokenManager.accessToken;

        localStorage.setItem("email", setemail);
        localStorage.setItem("authToken", authToken);

        if (user.emailVerified) {
          setLoggedIn(true);
          navigate("/Datasubmitform");
        } else {
          if (setemail !== "mukeshsharmajaipur1975@gmail.com") {
            sendEmailVerification(user)
              .then(() => {
                // Email verification sent
              })
              .catch((error) => {
                console.error("Error sending email verification", error);
              });
          }
          // Handle the case where email is not verified
        }
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  navigate("/");
                }}
                src={Logo}
                alt="Logo"
                width="70"
                height="74"
                border="none"
                className="d-inline-block align-text-top"
              />
              <span
                style={{
                  color: "#DC3545",
                  fontSize: "30px",
                  fontWeight: "500",
                  marginLeft: "10px" // Add margin for spacing
                }}
              >
                Hogamilan
              </span>
            </a>
            <button
              style={{ backgroundColor: "#fff", width: "50px", height: "50px" }}
              className="navbar-toggler always-visible"
              type="button"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ fontSize: "3rem" }} />
            </button>
            <Drawer className="custom-drawer" anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <div
                style={{ width: "240px", display: "flex", backgroundColor: "#ffe6f2", height: "100%" }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      padding: "10px"
                    }}
                    onClick={toggleDrawer(false)}
                  >
                    <ChevronLeftIcon style={{ color: "orange", width: "40px", height: "40px" }} />
                  </button>
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: 'white', color: 'white' }} >Home</button>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </div>
        </nav>
      </div>
      <Grid container spacing={0} style={{ height: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ height: "auto", padding: "20px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={Jodi}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            style={{
              height: "auto",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "25px", fontWeight: "500" }}>
                Sign in to continue to<span>Hogamilan.</span>
              </span>
              <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  getData(values);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <div>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleSubmit();
                    }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <label style={{ fontSize: 18, fontWeight: "700" }}>
                          Email id
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
                        />
                        <p style={{
                          margin: "0 0 10px 10px",
                          textAlign: "center",
                          fontSize: "10px",
                          color: "red",
                        }}>
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>
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
                            paddingLeft: "10px",
                            borderRadius: "8px",
                            borderColor: "white",
                          }}
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Enter password"
                        />
                        <p style={{
                          margin: "0 0 10px 10px",
                          textAlign: "ceter",
                          fontSize: "10px",
                          color: "red",
                        }}>
                          {errors.password && touched.password && errors.password}
                        </p>
                        <label
                          onClick={() => {
                            navigate("/Forgotpassword");
                          }}
                          style={{ color: "blue" }}
                        >
                          Forgot password?
                        </label>
                      </div>
                      <button
                        style={{
                          width: "83%",
                          borderColor: "white",
                          color: "white",
                          backgroundColor: "#DC3545",
                          height: "50px",
                          paddingLeft: "10px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0,  0, 0.5)"
                        }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Log in
                      </button>
                    </form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        marginRight: "30px",
                      }}
                    >
                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Do not have an account?
                        <span
                          onClick={() => {
                            navigate("/Signuppage");
                          }}
                          style={{ color: "rgb(53, 132, 173)", cursor: "pointer" }}
                        >
                          {" "}
                          Sign up
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              marginTop: "20px",
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
              <img style={{ width: "40px" }} src={facebook} alt="Facebook" />
              <img style={{ width: "40px" }} src={instagram} alt="Instagram" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "25%",
              marginTop: "20px",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "700" }}>Quick <span>Links</span></span>
            <span>About Us</span>
            <span>Blog</span>
            <span>Contact Us</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "25%",
              marginTop: "20px",
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
          marginTop: "20px",
          backgroundColor: "#DC3545",
          height: "60px",
        }}
      >
        <p style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
          Copyright © 2024 - Hogamilan - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
