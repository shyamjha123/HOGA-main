import React from "react";
import { useNavigate } from "react-router-dom";
function Errorscreen() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "50px", fontWeight: "bold" }}>
        Errorscreen please move to correct page{" "}
      </p>
      <p
        onClick={() => {
          navigate("/");
        }}
        style={{ fontSize: "30px", fontWeight: "bold", color: "#DC3545", cursor:"pointer" }}
      >
        /Home
      </p>
    </div>
  );
}

export default Errorscreen;
