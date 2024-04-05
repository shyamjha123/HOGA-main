import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./Nav.css";
import { signOut } from "firebase/auth";
import { database } from "../firebase/Firebaseconfig";

function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSignout = () => {
    signOut(database)
      .then(() => {
        localStorage.removeItem("authToken");
        // Reload the page after logout
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
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
                // fontFamily: ,
                marginLeft: "10px" // Add margin for spacing
              }}
            >
              Hogamilan
            </span>
          </a>

          {/* Show MenuIcon */}
          <button
            style={{ backgroundColor: "#fff", width: "50px", height: "50px" }}
            className="navbar-toggler always-visible"
            type="button"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon style={{ fontSize: "3rem" }} />
          </button>

          {/* Sidebar Drawer */}
          <Drawer
            className="custom-drawer"
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <div
              style={{
                width: "240px",
                display: "flex",
                backgroundColor: "#ffe6f2",
                height: "100%"
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              {/* Left side arrow icon to close */}

              {/* List items */}
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
              <ChevronLeftIcon   style={{color: "orange", width:"40px", height:"40px" }} />
            </button>

                <ListItem
                  button
                  onClick={() => {
                    navigate("/Loginpage");
                  }}
                >
                  <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: 'white', color: 'white' }} >LOGIN</button>
                </ListItem>

                <ListItem
                button
                onClick={() => {
                  navigate("/Signuppage");
                }}
              >
                <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: 'white', color: 'white' }} >SIGN UP</button>
              </ListItem>

                <ListItem
                  button
                  onClick={() => {
                    navigate("/Datasubmitform");
                  }}
                >
                  <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: "white", color: "black",color: 'white' }} >User dashboard</button>

                </ListItem>

                <ListItem
                button
              
              >
                <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: "white", color: "black",color: 'white' }} >Contact us</button>

              </ListItem>

          
              <ListItem button onClick={handleSignout}>
                <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: "white", color: "black", color: 'white' }}>Logout</button>
              </ListItem>
              
              </List>
            </div>
          </Drawer>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
