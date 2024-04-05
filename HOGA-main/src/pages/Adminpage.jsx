import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Adminlogin.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { database } from "../firebase/Firebaseconfig";
console.log("====================================");
console.log(database);
console.log("====================================");
// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Adminpage() {
  const [emailvallid, setEmailvalid] = useState(null); // State to hold emailVerified
  //   const dataSet = itemData && itemData.emailVerified;

  useEffect(() => {
    // Apply background color to the body element
    document.body.style.backgroundColor = "rgba(44, 202, 253, 1)";

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Revert back to default background color
    };
  }, []);

  const navigate = useNavigate();

  const getData = (values, e) => {
    const setemail = values.email;
    console.log(setemail, "email");
    const setpassword = values.password;
    console.log(setpassword, "password");

    signInWithEmailAndPassword(database, setemail, setpassword)
      .then((data) => {
        console.log(data, "rambahadur");
        console.log(data.user.emailVerified, "kaliya");
        const isEmailValid = data.user.emailVerified;
        const isEmail = data.user.email;
        localStorage.setItem('adminlogin',  isEmail);
        const adminemailId = localStorage.getItem('adminlogin');
        console.log('====================================');
        console.log(  adminemailId, 'shyambhao');
        console.log('====================================');
        console.log('====================================');
        console.log(isEmail,'newlogin');
        console.log('====================================');
        console.log(isEmailValid, "bhokalo");
        setEmailvalid(isEmailValid);
        console.log(emailvallid, "lokopo");
        const authToken = data.user.stsTokenManager.accessToken;
        localStorage.setItem("authToken", authToken);
        console.log(authToken, "madarchod");
     

      if(adminemailId === 'mukeshsharmajaipur1975@gmail.com' ){
        navigate("/Admindashboard");
        alert('Admin login sucessfully')
      }else{
        alert("only admin canaccess this")
      }
        // navigate("/Admindashboard");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  console.log(emailvallid, "datastoregge");
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",

        minHeight: "30vh",
      }}
    >
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
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
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <label style={{ fontSize: 14, fontWeight: "700" }}>
                    Username
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id / username"
                    // className="form-control inp_text"
                    id="email"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="error">
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
                  <label style={{ fontSize: 14, fontWeight: "700" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    // className="form-control"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="error">
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

                {/* Click on submit button to submit the form */}
                <button
                  style={{ backgroundColor: "rgb(53, 132, 173)",   boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)" }}
                  type="submit"
                >
                  Sign in
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "20px",
                    gap: 10,
                  }}
                >
             
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Adminpage;
