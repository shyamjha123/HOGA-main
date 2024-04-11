import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.jpg";
// import "./mydetail.css";

import { Drawer, List, ListItem, ListItemText } from "@mui/material";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


function Mydetail() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [editedData, setEditedData] = useState({}); // State to hold edited data

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')));
  }, []);



  const handleInputChange = (fieldName, value) => {
    if (value === "") {
      // If the value is empty, remove the field from editedData
      const { [fieldName]: removedField, ...remainingFields } = editedData;
      setEditedData(remainingFields);
    } else {
      setEditedData({ ...editedData, [fieldName]: value });
    }
  
    // Always update userData state with the current input value
    setUserData({ ...userData, [fieldName]: value });
  };
  
  const handleSubmit = async () => {
    try {
      const updatedData = { ...userData, ...editedData };
      
      // Update local storage with merged data
      localStorage.setItem('userData', JSON.stringify(updatedData));
      // https://hogamilan-bc801-default-rtdb.firebaseio.com/
      // https://hogamilan-bc801-default-rtdb.firebaseio.com/
      // https://expertapp-86aba-default-rtdb.firebaseio.com/hogamilan/${userData.uniqueid}.json
      // Make a PUT request to update the profile data in Firebase
      const response = await fetch(`https://hogamilan-374c2-default-rtdb.firebaseio.com/hogamilan/${userData.uniqueid}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile data in Firebase");
      }
  
      alert("Your profile has been updated successfully");
  
      setUserData(updatedData); // Update state with merged data
      setEditedData({}); // Clear edited data state
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error, show error message to the user, etc.
    }
  };
  
  
  
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column',  }}>
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

        {/* Show MenuIcon */}
        <button
        style={{backgroundColor:"#fff", width:"50px", height:"50px"}}
          className="navbar-toggler always-visible"
          type="button"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon style={{ fontSize: "3rem" }} />
        </button>

        {/* Sidebar Drawer */}
        <Drawer      className="custom-drawer"  anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
          style={{ width: "240px",display:"flex", backgroundColor:"#ffe6f2", height:"100%" }}
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
            <ChevronLeftIcon   style={{color: "orange", width:"40px", height:"40px" }} />
          </button>
              <ListItem
                button
                onClick={() => {
                  navigate("/");
                }}
              >
                <button style={{width:"200px", borderRadius:"20px", height:"40px", backgroundColor:"#DC3545",borderColor:'white', color:'white'}}   >Home</button>
              </ListItem>

              <ListItem
              button
              onClick={() => {
                navigate("/Datasubmitform");
              }}
            >
              <button style={{width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: "white", color: "white"}}   >User dashboard</button>
            </ListItem>
            
              
            </List>
          </div>
        </Drawer>
      </div>
    </nav>
  </div>
   
      {userData ? (
        <div>
          <div style={{marginTop:"20px"}}>
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            {userData.imagePath.map((item, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} >
                <img src={item} className="d-block w-75  mx-auto img-fluid" alt={`Slide ${index}`} style={{maxHeight: '390px'}} />
              </div>
            ))}
          </div>
        
          <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" style={{left: "20%", right: "auto", }}>
          <ChevronLeftIcon   style={{color: "#DC3545", width:"40px", height:"40px" }} />
            <span className="visually-hidden"   >Previous</span>
          </button>
          <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" style={{right: "20%", left: "auto"}}>
          <ChevronRightIcon   style={{color: "#DC3545", width:"40px", height:"40px" }} />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
          
            <div style={{marginTop:"40px", display:"flex", flexDirection:"column",  paddingLeft:"10px" , justifyContent:"space-between"}}>
              <h5 className="card-title" style={{fontSize:"30px", color:"#DC3545",marginBottom:'20px' }}>Profile details</h5>
     
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:'15px'}}>
              <span style={{color:"gray"}}>Name:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.name || (userData.name || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("name", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:'15px'}}>
              <span style={{color:"gray"}}>Middle name:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.middlename || (userData.middlename || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("middlename", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Surname:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.surname || (userData.surname || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("surname", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Nick name:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.nickname || (userData.nickname || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
            
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Caste:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.caste || (userData.caste || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("caste", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Sub caste:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.casteSubcaste || (userData.casteSubcaste || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("casteSubcaste", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Religion:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.religion || (userData.religion || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("religion", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Date of birth:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.dateOfBirth || (userData.dateOfBirth || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Time of birth:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.timeofbirth || (userData.timeofbirth || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("timeofbirth", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Place of birth:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.placeofbirth || (userData.placeofbirth || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("placeofbirth", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Birth Village:-</span>
              <input
              style={{height:"30px",borderRadius:"10px", borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.birthvillage || (userData.birthvillage || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("birthvillage", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Birth City:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.birthcity || (userData.birthcity || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("birthcity", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>State of birth:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.stateofbirth || (userData.stateofbirth || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("stateofbirth", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Age:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.age || (userData.age || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("age", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Height:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.height || (userData.height || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("height", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Weight:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.weight || (userData.weight || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("weight", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Current City:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.city || (userData.city || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("city", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}> Current Village:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.village || (userData.village || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("village", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
        
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Current district:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.district || (userData.district || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("district", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}> Current state:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.currentstate || (userData.currentstate || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("currentstate", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Pin code:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.pincode || (userData.pincode || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Country:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.country || (userData.country || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("country", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Nationality:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.nationality || (userData.nationality || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
            
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Education:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.education || (userData.education || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("education", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Education detail:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.educationdetail || (userData.educationdetail || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("educationdetail", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Physical status:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.physicalstatus || (userData.physicalstatus || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("physicalstatus", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Gotra rishi:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.gotrarashi || (userData.gotrarashi || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("gotrarashi", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Gotra dada:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.gotradada || (userData.gotradada || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("gotradada", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Gotra dadi:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.gotradadi || (userData.gotradadi || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("gotradadi", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Gotra nana:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.gotranana || (userData.gotranana || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("gotranana", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Gotra nani:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.gotranani || (userData.gotranani || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("gotranani", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Manglik:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.manglik || (userData.manglik || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("manglik", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Rashi:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.rashi || (userData.rashi || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("rashi", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Star:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.star || (userData.star || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("star", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Blood group:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.bloodgroup || (userData.bloodgroup || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("bloodgroup", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Body type:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.bodytype || (userData.bodytype || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("bodytype", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Complextion:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.complexion || (userData.complexion || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("complexion", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Hobbies:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.hobbies || (userData.hobbies || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("hobbies", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Mother tongue:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.mothertongue || (userData.mothertongue || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("mothertongue", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:'15px'}}>
              <span style={{color:"gray"}}>Profile created by:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px", width:"50%", marginRight:"30px"}}
                type="text"
                value={editedData.creation || (userData.creation || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("creation", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Smoke:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.smoke || (userData.smoke || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("smoke", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Drink:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.drink || (userData.drink || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("drink", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Diet:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.diet || (userData.diet || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("diet", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Marital status:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.status || (userData.status || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("status", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>No. of children:-   </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.noofchildren || (userData.noofchildren || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("noofchildren", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Contact no:-   </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.number || (userData.number || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("number", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Whatsapp no:-   </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.whatsappno || (userData.whatsappno || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("whatsappno", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Email id :-    </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.emailid || (userData.emailid || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("emailid", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <h5 className="card-title" style={{ fontSize: "30px", color: "#DC3545",marginBottom:'20px'  }}>Occupation details</h5>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Job type:-   </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.jobstatus || (userData.jobstatus || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("jobstatus", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
        
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Monthly Income:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.monthlyincome || (userData.monthlyincome || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("monthlyincome", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Annual Income:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.annualIncome || (userData.annualIncome || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <h5 className="card-title" style={{fontSize:"30px", color:"#DC3545",marginBottom:'20px' }}>Family details</h5>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Father name:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.fathername || (userData.fathername || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("fathername", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Father Occupation:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.fatheroccupation || (userData.fatheroccupation || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("fatheroccupation", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Father Contact no:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.fathercotactno || (userData.fathercotactno || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("fathercotactno", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Mother Name:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.mothername || (userData.mothername || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("mothername", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Mother Occupation:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.motheroccupation || (userData.motheroccupation || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("motheroccupation", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Mother Contact no:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.mothercontactno || (userData.mothercontactno || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("mothercontactno", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>No of brothers:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.noofbothers || (userData.noofbothers || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("noofbothers", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Brother marital ststus:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.brothermaritalstatus || (userData.brothermaritalstatus || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("brothermaritalstatus", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Brother Contact no:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.brothercontactno || (userData.brothercontactno || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("brothercontactno", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>No. sisters:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.nosisters || (userData.nosisters || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("nosisters", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
       
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Sisters marital status :-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.sistersmaritalstatus || (userData.sistersmaritalstatus || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("sistersmaritalstatus", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Sister contact no :-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.sistercontactno || (userData.sistercontactno || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("sistercontactno", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <h5 className="card-title" style={{fontSize:"30px" , color:"#DC3545",marginBottom:'20px' }}>Partner prefernce and marital status</h5>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Age upto :- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.ageto || (userData.ageto || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("ageto", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Marital status :- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnermaritalstatus || (userData.partnermaritalstatus || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnermaritalstatus", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>No. of children:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
              
                type="text"
                value={editedData.partnernoofchildren || (userData.partnernoofchildren || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnernoofchildren", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Body type:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerbodytype || (userData.partnerbodytype || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerbodytype", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Complextion:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnercomplextion || (userData.partnercomplextion || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnercomplextion", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Height:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerheight || (userData.partnerheight || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerheight", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Weight:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerweight || (userData.partnerweight || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerweight", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Diet:-</span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerdiet || (userData.partnerdiet || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerdiet", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Religion:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerreligion || (userData.partnerreligion || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerreligion", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Caste:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnercaste || (userData.partnercaste || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnercaste", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Mother tongue:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnermothertongue || (userData.partnermothertongue || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnermothertongue", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Education:- </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnereducation || (userData.partnereducation || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnereducation", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Occupation:-   </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partneroccupation || (userData.partneroccupation || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partneroccupation", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>State:-     </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnerstate || (userData.partnerstate || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnerstate", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
                
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Country of residence:-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.partnercountryofresidence || (userData.partnercountryofresidence || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("partnercountryofresidence", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",marginTop:'15px'}}>
              <span style={{color:"gray"}}>Message  :-  </span>
              <input
              style={{height:"30px",borderRadius:"10px",borderColor:"#fff", borderWidth:"2px",width:"50%",marginRight:"30px"}}
                type="text"
                value={editedData.message || (userData.message || "")} // If userData is null, use empty string
                onChange={(e) => handleInputChange("message", e.target.value)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
              </div>
              <button    style={{
                cursor: "pointer",
                color:"#fff",
                backgroundColor: "#DC3545",
                borderColor:"#fff",
                borderWidth: "3px",
                marginTop:"20px",
                width:"100px",
                height: "35px",
              }} onClick={handleSubmit}>Update</button>
            </div>
           
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
      
    </div>
  );
}

export default Mydetail;
