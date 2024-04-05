import React from 'react';
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";

function Footer() {
  return (
    <>
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent:"center",
      marginTop: "40px",
      width: "100%",
      backgroundColor: "#DC3545",
      height: "90px",
    }}
  >
    <p style={{ fontSize: "30px", color: "white", textAlign:'center' }}>
      Your story is waiting to happen!
    </p>
  </div>

  <div
    style={{
      display: "flex",
      marginTop: "40px",
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
 
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: "90px",
      backgroundColor: "#DC3545",
      height: "60px",
    }}
  >

    <p style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
      Copyright © 2024 - Hogamilan - All Rights Reserved
    </p>
  </div>
 
    </>
  )
}

export default Footer
