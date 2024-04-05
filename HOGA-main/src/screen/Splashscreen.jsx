import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/logo.jpg";
// import './splashscreen.css';

function Splashscreen() {
  const navigate = useNavigate();
  useEffect(() => {
    // Apply background color to the body element
    document.body.style.backgroundColor = "#FFFFE0";

    setTimeout(() => {
      navigate('/Homepage')
      // navigation.navigate("Login");
    }, 3000);
  
    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.backgroundColor = ""; // Revert back to default background color
    };
  }, []);

  // useEffect(() => {
  
  // }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        // height: "100%",
        minHeight: "90vh",
        // backgroundColor:"red"
      }}
    >
   

      <div
        style={{
          borderWidth: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          overflow: 'hidden',
          // backgroundColor:"green"
        }}
      >
        <img
          src={Logo}
          style={{ width: "300px", height: "300px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}

export default Splashscreen;
