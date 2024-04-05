import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import Logo from "../assets/logo.jpg";
import { signOut } from "firebase/auth";
import { database } from "../firebase/Firebaseconfig";
import Resizer from "react-image-file-resizer";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; 



const Datasubmitform = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [form, setForm] = useState({
    star:"",
    rashi:"",
    otherValue: "",
    currentstate:"",
    jobstatus:"",
    partnermaritalstatus:"",
    status: "",
    creation:"",
    name:"",
    middlename:"",
    nickname:"",
    surname:"",
    caste:"",
    casteSubcaste:"",
    religion:"",
    dateOfBirth:"",
    timeofbirth:"",
    placeofbirth:"",
    stateofbirth:"",
    age:"",
    height:'',
    weight:"",
    village:"",
    city:"",
    pincode:"",
    district:"",
    state:"",
    country:"",
    nationality:"",
    education:"",
    educationdetail:"",
    physicalstatus:"",
    gotrarashi:"",
    gotradada:"",
    gotradadi:'',
    gotranana:"",
    gotranani:'',
    bloodgroup:"",
    bodytype:"",
    hobbies:"",
    mothertongue:"",
    smoke:"",
    drink:"",
    diet:"",
    manglik:"",
    noofchildren:"",
    number:"",
    whatsappno:"",
    monthlyincome:"",
    annualIncome:"",
    fathername:"",
    fatheroccupation:"",
    fathercotactno:"",
    mothername:"",
    mothercontactno:"",
    motheroccupation:"",
    noofbothers:"",
    brothermaritalstatus:"",
    brothercontactno:"",
    nosisters:"",
    sistersmaritalstatus:"",
    sistercontactno:"",
    ageto:"",
    partnernoofchildren:"",
    partnerbodytype:"",
    partnercomplextion:"",
    partnerheight:"",
    partnerweight:"",
    partnerdiet:"",
    partnerreligion:"",
    partnercaste:"",
    partnermothertongue:"",
    partnereducation:"",
    partneroccupation:"",
    partnerstate:'',
    partnercountryofresidence:"",
    message:"",
    imagePath:[],
    complexion:"",
    emailid:"",
    birthcity:"",
    birthvillage:"",
  })


  console.log(form.imagePath, 'imagpath');

  console.log(form.otherValue, 'job status ');
 
  const handleImageChange = async (e) => {
    const files = e.target.files;
    const images = [];
  
    try {
      const promises = Array.from(files).map(async (file) => {
        return new Promise((resolve, reject) => {
          try {
            Resizer.imageFileResizer(
              file,
              50, // Reduced width
              50, // Reduced height
              'JPEG',
              50, // Reduced quality (0-100)
              0,
              (uri) => {
                images.push(uri);
                resolve();
              },
              'base64',
              200,
              200
            );
          } catch (err) {
            reject(err);
          }
        });
      });
  
      await Promise.all(promises);
  
      // Once all images are resized, update the form state
      setForm(prevState => ({ ...prevState, imagePath: [...prevState.imagePath, ...images] }));
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(form.imagePath, 'image');
  

  const handleSubmit = async () => {
    try {

      let jobStatusToSend = form.jobstatus;
      if (form.jobstatus === 'other') {
        jobStatusToSend = form.otherValue.trim();
      }

      // Check if the form data has been submitted previously within the last minute
      const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
      if (lastSubmissionTime) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - parseInt(lastSubmissionTime, 10);
        const submissionInterval = 60000; // 1 minute in milliseconds
        if (timeDifference < submissionInterval) {
          // Notify the user that they cannot submit the form again so soon
          alert("Please wait for some time before submitting the form again.");
          return;
        }
      }
  
      // Proceed with submitting the form
      const response = await fetch("https://hogamilan-374c2-default-rtdb.firebaseio.com/hogamilan.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({ ...form, jobstatus: jobStatusToSend }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
  
      const responseData = await response.json();
      console.log("Form data submitted successfully:", responseData.name);

      const uniqueid = responseData.name;
      console.log(uniqueid,'bhoka');
      setForm({...form, id:uniqueid})
      alert("congratulations your Profile created successfully")
  
      // Store the current timestamp as the last submission time in local storage
      localStorage.setItem('lastSubmissionTime', new Date().getTime());
  
      localStorage.setItem('name', form.name );
      localStorage.setItem('userData', JSON.stringify({ ...form, jobstatus: jobStatusToSend, uniqueid }));
      navigate("/Mydetail");
      // alert("data submitted", responseData)
      // You can do further actions here, like showing a success message to the user.
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error, show error message to the user, etc.
    }
  };
  
  const handleSignout = () => {
    signOut(database)
      .then(() => {
        localStorage.removeItem("authToken");
        // Reload the page after logout
        window.location.reload();
        window.location.href = "/"; // Navigate to the homepage
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };




  console.log(form.status, 'fdfdfdfshya');

  const userdetail = localStorage.getItem('Username');
  
  console.log(form.dateOfBirth, 'dateofbirthh');

  const handleJobStatusChange = (e) => {
    const { value } = e.target;
    if (value !== 'other') {
      setForm({ ...form, jobstatus: value });
    } else {
      setForm({ ...form, jobstatus: 'other' });
    }
  };
  

  const handleOtherInputChange = (e) => {
    const { value } = e.target;
    setForm({ ...form, otherValue: value });
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >

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
                    navigate("/Mydetail");
                  }}
                >
                  <button style={{width:"200px", borderRadius:"20px", height:"40px", backgroundColor:"#DC3545",borderColor:'white', color:'white'}}   >User detail</button>
                </ListItem>

                <ListItem
                button
                onClick={() => {
                  handleSignout()
                }}
              >
              <button style={{width:"200px", borderRadius:"20px", height:"40px", backgroundColor:"#DC3545", color:"white",borderColor:"white", }} >Logout</button>

              </ListItem>
            
                
              </List>
            </div>
          </Drawer>
        </div>
      </nav>
    </div>
  

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
          width: "100%",
          height: "110px",
          backgroundColor: "black",
        }}
      >
     <p style={{color:"white", fontSize:"30px", fontFamily:"cursive" }}>{userdetail}</p> 
      </div>
      <div style={{ paddingLeft: "40px", paddingTop: "20px" }}>
        <p style={{ fontSize: "28px", fontWeight: "400" }}>
          Update Your Profile
        </p>

            <div>
          

            <div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>
<p style={{fontSize:"20px", fontWeight:"500", fontFamily:'cursive'}}>ABOUT MYSELF</p>


</div>



              <div
              style={{
                display: "flex",
                width: "80%",
                  marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  flexDirection: "column",
                }}
              >
                <label>Name</label>
                <input
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    paddingLeft: "10px",
                    borderColor: "#F2F2F2",
                    transition: "border-color 0.3s ease",
                    borderWidth: "3px",
                    height: "30px",
                  }}
                  type="name"
                  name="name"

                  value={form.name}
                  onChange={(e)=>{
                    setForm({...form, name:e.target.value})
                  }}
               
                  // placeholder="Enter username"
                  id="name"
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#87CEFA";
                  }} // Change border color on hover
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#F2F2F2";
                  }} // Revert border color on mouse leave
                />
             
              </div>
            </div>
            <div
            style={{
              display: "flex",
              width: "80%",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "80%",
                flexDirection: "column",
              }}
            >
            <label>Middle name</label>
            <input
              style={{
                width: "100%",
                cursor: "pointer",
                paddingLeft: "10px",
                borderColor: "#F2F2F2",
                transition: "border-color 0.3s ease",
                borderWidth: "3px",
                height: "30px",
              }}
              type="middlename"
              name="middlename"
              value={form.middlename}
              // value={}
              onChange={(e)=>{
                setForm({...form, middlename:e.target.value })
              }}   
    
              id="middlename"
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#87CEFA";
              }} // Change border color on hover
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#F2F2F2";
              }} // Revert border color on mouse leave
            />
           
            </div>
          </div>

          <div
          style={{
            display: "flex",
            width: "80%",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              flexDirection: "column",
            }}
          >
          <label htmlFor="input1">Nick name</label>
          <input
            style={{
              width: "100%",
              cursor: "pointer",
              paddingLeft: "10px",
              borderColor: "#F2F2F2",
              transition: "border-color 0.3s ease",
              borderWidth: "3px",
              height: "30px",
            }}
            type="nickname"
            name="nickname"
            onChange={(e)=>{
              setForm({...form, nickname:e.target.value})
            }}
            value={form.nickname}
            // placeholder="Enter username"
            id="nickname"
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#87CEFA";
            }} // Change border color on hover
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#F2F2F2";
            }} // Revert border color on mouse leave
          />
         
          </div>
        </div>

          <div
          style={{
            display: "flex",
            // gap: "30px",
            marginTop: "20px",
            // flexDirection: "row",
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              flexDirection: "column",
            }}
          >
          <label htmlFor="input1">Surname</label>
          <input
            style={{
              width: "100%",
              cursor: "pointer",
              paddingLeft: "10px",
              transition: "border-color 0.3s ease",
              borderColor: "#F2F2F2",
              borderWidth: "3px",
              height: "30px",
            }}
            type="surname"
            name="surname"
      
            // placeholder="Enter username"
            id="surname"

            onChange={(e)=>{
              setForm({...form, surname:e.target.value})
            }}
            value={form.surname}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#87CEFA";
            }} // Change border color on hover
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#F2F2F2";
            }} // Revert border color on mouse leave
          />
          </div>
        </div>
        <div
        style={{
          display: "flex",
          // gap: "30px",
          marginTop: "20px",
          // flexDirection: "row",
          width: "80%",
        }}
      >
      <div
            style={{
              display: "flex",
              width: "80%",
              flexDirection: "column",
            }}
          >

      <label htmlFor="input1">Caste</label>
      <input
        style={{
          width: "100%",
          cursor: "pointer",
          paddingLeft: "10px",
          transition: "border-color 0.3s ease",
          borderColor: "#F2F2F2",
          borderWidth: "3px",
          height: "30px",
        }}
        type="caste"
        name="caste"
        onChange={(e)=>{
          setForm({...form, caste:e.target.value})
        }}
        value={form.caste}

        // placeholder="Enter username"
        id="caste"
        onMouseEnter={(e) => {
          e.target.style.borderColor = "#87CEFA";
        }} // Change border color on hover
        onMouseLeave={(e) => {
          e.target.style.borderColor = "#F2F2F2";
        }} // Revert border color on mouse leave
      />
      </div>
      </div>
            <div
            style={{
              display: "flex",
              // gap: "30px",
              marginTop: "20px",
              // flexDirection: "row",
              width: "80%",
            }}
          >
          <div
          style={{
            display: "flex",
            width: "80%",
            flexDirection: "column",
          }}
        >

        <label htmlFor="input1">Subcaste</label>
        <input
          style={{
            width: "100%",
            cursor: "pointer",
            paddingLeft: "10px",
            transition: "border-color 0.3s ease",
            borderColor: "#F2F2F2",
            borderWidth: "3px",
            height: "30px",
          }}
          type="casteSubcaste"
          name="casteSubcaste"
          onChange={(e)=>{
            setForm({...form, casteSubcaste:e.target.value})
          }}
          value={form.casteSubcaste}
   
          // placeholder="Enter username"
          id="casteSubcaste"
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#87CEFA";
          }} // Change border color on hover
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#F2F2F2";
          }} // Revert border color on mouse leave
        />
    </div>
          </div>
        <div
        style={{
          display: "flex",
          // gap: "30px",
          marginTop: "20px",
          // flexDirection: "row",
          width: "80%",
        }}
      >
      
        <div
          style={{
            display: "flex",
            width: "80%",
            flexDirection: "column",
          }}
        >
        <label htmlFor="input1">Religion</label>
        <input
          style={{
            width: "100%",
            cursor: "pointer",
            transition: "border-color 0.3s ease",
            paddingLeft: "10px",
            borderColor: "#F2F2F2",
            borderWidth: "3px",
            height: "30px",
          }}
          type="religion"
          name="religion"
          onChange={(e)=>{
            setForm({...form, religion:e.target.value})
          }}
          value={form.religion}
          // placeholder="Enter username"
          id="religion"
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#87CEFA";
          }} // Change border color on hover
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#F2F2F2";
          }} // Revert border color on mouse leave
        />
        </div>

      </div>
    <div
    style={{
      display: "flex",
      // gap: "30px",
      marginTop: "20px",
      // flexDirection: "row",
      width: "80%", // Change to row to align items horizontally
    }}
  >
    {/* Add to Gallery Button */}

    <div
    style={{
      display: 'flex',
      width: '80%',
      flexDirection: 'column',
    }}
  >
    <label htmlFor="dateOfBirth">Date of birth</label>
    <input
      style={{
        width: '100%',
        cursor: 'pointer',
        paddingLeft: '10px',
        transition: 'border-color 0.3s ease',
        borderColor: '#F2F2F2',
        borderWidth: '3px',
        height: '30px',
      }}
      type="date"
      id="dateOfBirth"
      name="dateOfBirth"
      onChange={(e)=>{
        setForm({...form,  dateOfBirth:e.target.value})
      }}
      value={form.dateOfBirth}
      onMouseEnter={(e) => {
        e.target.style.borderColor = '#87CEFA';
      }} // Change border color on hover
      onMouseLeave={(e) => {
        e.target.style.borderColor = '#F2F2F2';
      }} // Revert border color on mouse leave
    />
  </div>

  </div>

  <div
  style={{
    display: "flex",
    // gap: "30px",
    marginTop: "20px",
    flexDirection: "row",
    width: "80%", 
  }}
>
<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1"> Time of birth</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="timeofbirth"
  name="timeofbirth"
  onChange={(e)=>{
    setForm({...form, timeofbirth:e.target.value})
  }}
  value={form.timeofbirth}
  // placeholder="Enter username"
  id="timeofbirth"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>

</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Place of birth</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="placeofbirth"
  name="placeofbirth"
  onChange={(e)=>{
    setForm({...form, placeofbirth:e.target.value})
  }}
  value={form.placeofbirth}
  // placeholder="Enter username"
  id="placeofbirth"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>


</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Village of birth</label>
              <input
                style={{
                  width: "100%",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                  paddingLeft: "10px",
                  borderColor: "#F2F2F2",
                  borderWidth: "3px",
                  height: "30px",
                }}
                type="birthvillage"
                name="birthvillage"
       
                // placeholder="Enter username"
                id="birthvillage"
                onChange={(e)=>{
                  setForm({...form, birthvillage:e.target.value})
                }}
                value={form.birthvillage}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
</div>
</div>
<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1"> City of birth</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="birthcity"
  name="birthcity"

  // placeholder="Enter username"
  id="birthcity"
  onChange={(e)=>{
    setForm({...form, birthcity:e.target.value})
  }}
  value={form.birthcity}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>
<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">State of birth</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="stateofbirth"
  name="stateofbirth"

  onChange={(e)=>{
    setForm({...form, stateofbirth:e.target.value})
  }}
  value={form.stateofbirth}

  // placeholder="Enter username"
  id="stateofbirth"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>
</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>
<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Age</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="age"
  name="age"

  // placeholder="Enter username"
  id="age"
  onChange={(e)=>{
    setForm({...form, age:e.target.value})
  }}
  value={form.age}

  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>
</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>
<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Height</label>

              <input
                style={{
                  width: "100%",
                  cursor: "pointer",
                  paddingLeft: "10px",
                  transition: "border-color 0.3s ease",
                  borderColor: "#F2F2F2",
                  borderWidth: "3px",
                  height: "30px",
                }}
                type="height"
                name="height"

                onChange={(e)=>{
                  setForm({...form, height:e.target.value})
                }}
                value={form.height}
       
                // placeholder="Enter username"
                id="height"
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
</div>
</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Weight</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  name="weight"
  onChange={(e)=>{
    setForm({...form, weight:e.target.value})
  }}
  value={form.weight}
  // placeholder="Enter username"
  id="weight"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1"> Current city</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="city"
  name="city"

  // placeholder="Enter username"
  id="city"
  onChange={(e)=>{
    setForm({...form, city:e.target.value})
  }}
  value={form.city}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Current Village</label>
              <input
                style={{
                  width: "100%",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                  paddingLeft: "10px",
                  borderColor: "#F2F2F2",
                  borderWidth: "3px",
                  height: "30px",
                }}
                type="village"
                name="village"
       
                // placeholder="Enter username"
                id="village"
                onChange={(e)=>{
                  setForm({...form, village:e.target.value})
                }}
                value={form.village}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#87CEFA";
                }} // Change border color on hover
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#F2F2F2";
                }} // Revert border color on mouse leave
              />
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Current district</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="district"
  name="district"
  onChange={(e)=>{
    setForm({...form, district:e.target.value})
  }}
  value={form.district}
  // placeholder="Enter username"
  id="district"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Current State</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="currentstate"
  name="currentstate"

  // placeholder="Enter username"
  id="currentstate"
  onChange={(e)=>{
    setForm({...form, currentstate:e.target.value})
  }}
  value={form.currentstate}

  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Pin code</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="number"
  name="pincode"
  onChange={(e)=>{
    setForm({...form, pincode:e.target.value})
  }}
  value={form.pincode}

  // placeholder="Enter username"
  id="pincode"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>







<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Country</label>
          <input
            style={{
              width: "100%",
              cursor: "pointer",
              paddingLeft: "10px",
              transition: "border-color 0.3s ease",
              borderColor: "#F2F2F2",
              borderWidth: "3px",
              height: "30px",
            }}
            type="country"
            name="country"
            // placeholder="Enter username"
            id="country"
            onChange={(e)=>{
              setForm({...form, country:e.target.value})
            }}
            value={form.country}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#87CEFA";
            }} // Change border color on hover
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#F2F2F2";
            }} // Revert border color on mouse leave
          />
</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Nationality</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    paddingLeft: "10px",
    transition: "border-color 0.3s ease",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="nationality"
  name="nationality"

  // placeholder="Enter username"
  id="nationality"
  onChange={(e)=>{
    setForm({...form, nationality:e.target.value})
  }}
  value={form.nationality}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Education</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="education"
  name="education"

  // placeholder="Enter username"
  id="education"
  onChange={(e)=>{
    setForm({...form, education:e.target.value})
  }}
  value={form.education}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Education detail</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="educationdetail"
  name="educationdetail"

  // placeholder="Enter username"
  id="educationdetail"
  onChange={(e)=>{
    setForm({...form, educationdetail:e.target.value})
  }}
  value={form.educationdetail}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Physical status</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="physicalstatus"
  name="physicalstatus"

  // placeholder="Enter username"
  id="physicalstatus"
  onChange={(e)=>{
    setForm({...form, physicalstatus:e.target.value})
  }}
  value={form.physicalstatus}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>
<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Gotra rishi</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="gotrarashi"
  name="gotrarashi"
  onChange={(e)=>{
    setForm({...form, gotrarashi:e.target.value})
  }}
  value={form.gotrarashi}

  // placeholder="Enter username"
  id="gotrarashi"
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Gotra dada</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="gotradada"
  name="gotradada"

  // placeholder="Enter username"
  id="gotradada"
  onChange={(e)=>{
    setForm({...form, gotradada:e.target.value})
  }}
  value={form.gotradada}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Gotra dadi</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="gotradadi"
  name="gotradadi"

  // placeholder="Enter username"
  id="gotradadi"
  onChange={(e)=>{
    setForm({...form, gotradadi:e.target.value})
  }}
  value={form.gotradadi}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Gotra nana</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="gotranana"
  name="gotranana"

  // placeholder="Enter username"
  id="gotranana"
  onChange={(e)=>{
    setForm({...form, gotranana:e.target.value})
  }}
  value={form.gotranana}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Gotra nani</label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="gotranani"
name="gotranani"

// placeholder="Enter username"
id="gotranani"
onChange={(e)=>{
  setForm({...form, gotranani:e.target.value})
}}
value={form.gotranani}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>


</div>



</div>


<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
}}
>
<label htmlFor="input1">Manglik</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="manglik"
  onChange={(e)=>{
    setForm({ ...form, manglik: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">Please select</option>
  <option value="Manglik">Manglik</option>
  <option value="Non manglik">Non manglik</option>
  <option value="Non manglik">Angshik manglik</option>

</select>

</div>


</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>
<div
style={{
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
}}
>
<label htmlFor="input1">Rashi</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="rashi"
  onChange={(e)=>{
    setForm({ ...form, rashi: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">Please select</option>
  <option value="Aries (mesha)">Aries (mesha)</option>
  <option value="Taurus (vrishabha)">Taurus (vrishabha)</option>
  <option value="Gemini (mithuna)">Gemini (mithuna)</option>
  <option value="Cancer (karka)">Cancer (karka)</option>
  <option value="Leo (simha)">Leo (simha)</option>
  <option value="Virgo (kanya)">Virgo (kanya)</option>
  <option value="Libra (tula)">Libra (tula)</option>
  <option value="Scorpio (vrishchika)">Scorpio (vrishchika)</option>
  <option value="Sagittarius (dhanu)">Sagittarius (dhanu)</option>
  <option value="Capricorn (makara)">Capricorn (makara)</option>
  <option value="Aquarius (kumbha)">Aquarius (kumbha)</option>
  <option value="Pisces (meena)">Pisces (meena)</option>

</select>

</div>
</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Star</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px", 
}}
type="star"
name="star"

id="star"
onChange={(e)=>{
  setForm({...form, star:e.target.value})
}}
value={form.star}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>

</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Blood group</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px", 
}}
type="bloodgroup"
name="bloodgroup"

id="bloodgroup"
onChange={(e)=>{
  setForm({...form, bloodgroup:e.target.value})
}}
value={form.bloodgroup}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Body type</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="bodytype"
name="bodytype"

// placeholder="Enter username"
id="bodytype"
onChange={(e)=>{
  setForm({...form, bodytype:e.target.value})
}}
value={form.bodytype}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>



</div>


<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Complexion</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="complexion"
name="complexion"

// placeholder="Enter username"
id="complexion"
onChange={(e)=>{
  setForm({...form, complexion:e.target.value})
}}
value={form.complexion}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Hobbies</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="hobbies"
name="hobbies"

// placeholder="Enter username"
id="hobbies"
onChange={(e)=>{
  setForm({...form, hobbies:e.target.value})
}}
value={form.hobbies}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>



</div>



</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Mother tongue</label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="mothertongue"
name="mothertongue"

// placeholder="Enter username"
id="mothertongue"
onChange={(e)=>{
  setForm({...form, mothertongue:e.target.value})
}}
value={form.mothertongue}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>



</div>




</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",

}}
>
<div
  style={{
    display: "flex",
    width: "80%",
    flexDirection: "column",
  }}
>
  <label>Profile created by</label>
  <input
    style={{
      width: "100%",
      cursor: "pointer",
      paddingLeft: "10px",
      borderColor: "#F2F2F2",
      transition: "border-color 0.3s ease",
      borderWidth: "3px",
      height: "30px",
    }}
    type="creation"
    name="creation"

    value={form.creation}
    onChange={(e)=>{
      setForm({...form, creation:e.target.value})
    }}
 
    // placeholder="Enter username"
    id="creation"
    onMouseEnter={(e) => {
      e.target.style.borderColor = "#87CEFA";
    }} // Change border color on hover
    onMouseLeave={(e) => {
      e.target.style.borderColor = "#F2F2F2";
    }} // Revert border color on mouse leave
  />

</div>
</div>




<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Smoke</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="smoke"
name="smoke"

// placeholder="Enter username"
id="smoke"
onChange={(e)=>{
  setForm({...form, smoke:e.target.value})
}}
value={form.smoke}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>

</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Drink</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="drink"
name="drink"

// placeholder="Enter username"
id="drink"
onChange={(e)=>{
  setForm({...form, drink:e.target.value})
}}
value={form.drink}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>

</div>

<div
style={{
  display: "flex",
  marginTop: "20px",
  width: "80%",
}}
>

<div
style={{
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
}}
>
<label htmlFor="input1">Diet</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="diet"
  onChange={(e)=>{
    setForm({ ...form, diet: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">Select diet</option>
  <option value="veg">veg</option>
  <option value="non-veg">non-veg</option>

</select>

</div>

</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
}}
>
<label htmlFor="input1">Marital Status</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="status"
  onChange={(e)=>{
    setForm({ ...form, status: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">marital status</option>
  <option value="single">Single</option>
  <option value="divorce">Divorce</option>
  <option value="widow">Widow</option>
  <option value="widower">Widower</option>
</select>


</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">No of children</label>
<input
style={{
width: "100%",
cursor: "pointer",
transition: "border-color 0.3s ease",
paddingLeft: "10px",
borderColor: "#F2F2F2",
borderWidth: "3px",
height: "30px",
}}
type="noofchildren"
name="noofchildren"

// placeholder="Enter username"
id="noofchildren"
onChange={(e)=>{
  setForm({...form, noofchildren:e.target.value})
}}
value={form.noofchildren}
onMouseEnter={(e) => {
e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Contact no </label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="number"
name="number"

// placeholder="Enter username"
id="number"
onChange={(e)=>{
  setForm({...form, number:e.target.value})
}}
value={form.number}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Whatsapp no </label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="number"
name="whatsappno"

// placeholder="Enter username"
id="whatsappno"
onChange={(e)=>{
  setForm({...form, whatsappno:e.target.value})
}}
value={form.whatsappno}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Email ID </label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="emailid"
name="emailid"

// placeholder="Enter username"
id="emailid"
onChange={(e)=>{
  setForm({...form, emailid:e.target.value})
}}
value={form.emailid}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>
</div>



</div>

<div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>
<p style={{fontSize:"20px", fontWeight:"500", fontFamily:'cursive'}}>Occupation details</p>
</div>

<div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>




</div>



<div style={{ display: 'flex', width: '80%', flexDirection: 'row' }}>
<div style={{ display: 'flex', width: '80%', flexDirection: 'column' }}>
  <label htmlFor="input1">Job Status</label>
  <select
    style={{
      width: '100%',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease',
      paddingLeft: '10px',
      borderColor: '#F2F2F2',
      borderWidth: '3px',
      height: '30px',
    }}
    id="jobstatus"
    value={form.jobstatus}
    onChange={handleJobStatusChange}
    onMouseEnter={(e) => {
      e.target.style.borderColor = '#87CEFA';
    }}
    onMouseLeave={(e) => {
      e.target.style.borderColor = '#F2F2F2';
    }}
  >
    <option value="">Job status</option>
    <option value="government">Government job</option>
    <option value="private">Private job</option>
    <option value="business">Business</option>
    <option value="profession">Profession</option>
    <option value="other">Other</option>
  </select>

  {/* Conditionally render input field for "Other" option */}
  {form.jobstatus === 'other' && (
    <input
      type="text"
      value={form.otherValue}
      onChange={handleOtherInputChange}
      placeholder="Enter other job status"
      style={{   
         width: "100%",
         marginTop:"10px",
      cursor: "pointer",
      transition: "border-color 0.3s ease",
      paddingLeft: "10px",
      borderColor: "#F2F2F2",
      borderWidth: "3px",
      height: "30px",
     }}
     onMouseEnter={(e) => {
      e.target.style.borderColor = "#87CEFA";
    }} // Change border color on hover
    onMouseLeave={(e) => {
      e.target.style.borderColor = "#F2F2F2";
    }} 
    />
  )}
</div>
</div>







<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Monthly Income</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="monthlyincome"
  name="monthlyincome"

  // placeholder="Enter username"
  id="monthlyincome"
  onChange={(e)=>{
    setForm({...form, monthlyincome:e.target.value})
  }}
  value={form.monthlyincome}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>




</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Annual Income</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="annualIncome"
  name="annualIncome"

  // placeholder="Enter username"
  id="annualIncome"
  onChange={(e)=>{
    setForm({...form, annualIncome:e.target.value})
  }}
  value={form.annualIncome}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>

</div>

        <div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>
<p style={{fontSize:"20px", fontWeight:"500", fontFamily:'cursive'}}>Family details</p>
</div>
<div
style={{
  display: "flex",
  // gap: "30px",
  // marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Father name</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="fathername"
  name="fathername"

  // placeholder="Enter username"
  id="fathername"
  onChange={(e)=>{
    setForm({...form, fathername:e.target.value})
  }}
  value={form.fathername}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Father Occupation</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="fatheroccupation"
  name="fatheroccupation"

  // placeholder="Enter username"
  id="fatheroccupation"
  onChange={(e)=>{
    setForm({...form, fatheroccupation:e.target.value})
  }}
  value={form.fatheroccupation}

  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Father Contact no</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="number"
  name="fathercotactno"

  // placeholder="Enter username"
  id="fathercotactno"
  onChange={(e)=>{
    setForm({...form, fathercotactno:e.target.value})
  }}
  value={form.fathercotactno}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Mother name</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="mothername"
  name="mothername"
 
  // placeholder="Enter username"
  id="mothername"
  onChange={(e)=>{
    setForm({...form, mothername:e.target.value})
  }}
  value={form.mothername}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Mother Occupation</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="motheroccupation"
  name="motheroccupation"

  // placeholder="Enter username"
  id="motheroccupation"
  onChange={(e)=>{
    setForm({...form, motheroccupation:e.target.value})
  }}
  value={form.motheroccupation}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>



</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Mother contact no</label>
<input
style={{
  width: "100%",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  paddingLeft: "10px",
  borderColor: "#F2F2F2",
  borderWidth: "3px",
  height: "30px",
}}
type="number"
name="mothercontactno"

// placeholder="Enter username"
id="mothercontactno"
onChange={(e)=>{
  setForm({...form, mothercontactno:e.target.value})
}}
value={form.mothercontactno}
onMouseEnter={(e) => {
  e.target.style.borderColor = "#87CEFA";
}} // Change border color on hover
onMouseLeave={(e) => {
  e.target.style.borderColor = "#F2F2F2";
}} // Revert border color on mouse leave
/>



</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">No. of brothers</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="noofbothers"
  name="noofbothers"

  // placeholder="Enter username"
  id="noofbothers"
  onChange={(e)=>{
    setForm({...form, noofbothers:e.target.value})
  }}
  value={form.noofbothers}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>




</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Brother marital status</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="brothermaritalstatus"
  name="brothermaritalstatus"
 
  // placeholder="Enter username"
  id="brothermaritalstatus"
  onChange={(e)=>{
    setForm({...form, brothermaritalstatus:e.target.value})
  }}
  value={form.brothermaritalstatus}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Brother contact no</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="number"
  name="brothercontactno"
  
  // placeholder="Enter username"
  id="brothercontactno"
  onChange={(e)=>{
    setForm({...form, brothercontactno:e.target.value})
  }}
  value={form.brothercontactno}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>





</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">No.Sisters</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="nosisters"
  name="nosisters"

  // placeholder="Enter username"
  id="nosisters"
  onChange={(e)=>{
    setForm({...form, nosisters:e.target.value})
  }}
  value={form.nosisters}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>






</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Sisters marital status</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px", 
    height: "30px",
  }}
  type="sistersmaritalstatus"
  name="sistersmaritalstatus"

  // placeholder="Enter username"
  id="sistersmaritalstatus"
  onChange={(e)=>{
    setForm({...form, sistersmaritalstatus:e.target.value})
  }}
  value={form.sistersmaritalstatus}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Sister contact no</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="number"
  name="sistercontactno"

  // placeholder="Enter username"
  id="sistercontactno"
  onChange={(e)=>{
    setForm({...form, sistercontactno:e.target.value})
  }}
  value={form.sistercontactno}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>

</div>

<div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>
<p style={{fontSize:"20px", fontWeight:"500", fontFamily:'cursive'}}>Partner prefernce and marital status</p>
</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  // marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Age To.</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="ageto"
  name="ageto"

  // placeholder="Enter username"
  id="ageto"
  onChange={(e)=>{
    setForm({...form, ageto:e.target.value})
  }}
  value={form.ageto}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">partner marital status</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="partnermaritalstatus"
  onChange={(e)=>{
    setForm({ ...form, partnermaritalstatus: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">Marital status</option>
  <option value="single">Single</option>
  <option value="divorce">Divorce</option>
  <option value="widow">Widow</option>
  <option value="widower">Widower</option>
</select>
</div>



</div>


<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">No of children</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnernoofchildren"
  name="partnernoofchildren"

  // placeholder="Enter username"
  id="partnernoofchildren"
  onChange={(e)=>{
    setForm({...form, partnernoofchildren:e.target.value})
  }}
  value={form.partnernoofchildren}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Body Type</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnerbodytype"
  name="partnerbodytype"

  // placeholder="Enter username"
  id="partnerbodytype"
  onChange={(e)=>{
    setForm({...form, partnerbodytype:e.target.value})
  }}
  value={form.partnerbodytype}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Complextion</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnercomplextion"
  name="partnercomplextion"

  // placeholder="Enter username"
  id="partnercomplextion"
  onChange={(e)=>{
    setForm({...form, partnercomplextion:e.target.value})
  }}
  value={form.partnercomplextion}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Height</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnerheight"
  name="partnerheight"

  // placeholder="Enter username"
  id="partnerheight"
  onChange={(e)=>{
    setForm({...form, partnerheight:e.target.value})
  }}
  value={form.partnerheight}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Weight</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnerweight"
  name="partnerweight"

  // placeholder="Enter username"
  id="partnerweight"
  onChange={(e)=>{
    setForm({...form, partnerweight:e.target.value})
  }}
  value={form.partnerweight}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>



</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>
<div
style={{
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
}}
>
<label htmlFor="input1">Diet</label>
<select
  style={{
    width: '100%',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    paddingLeft: '10px',
    borderColor: '#F2F2F2',
    borderWidth: '3px',
    height: '30px',
  }}
  id="partnerdiet"
  onChange={(e)=>{
    setForm({ ...form, partnerdiet: e.target.value })
  }}
  onMouseEnter={(e) => {
    e.target.style.borderColor = '#87CEFA';
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = '#F2F2F2';
  }} // Revert border color on mouse leave
>
  <option value="">Select diet</option>
  <option value="veg">veg</option>
  <option value="non-veg">non-veg</option>

</select>


</div>
</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Religion</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnerreligion"
  name="partnerreligion"

  // placeholder="Enter username"
  id="partnerreligion"
  onChange={(e)=>{
    setForm({...form, partnerreligion:e.target.value})
  }}
  value={form.partnerreligion}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Caste</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnercaste"
  name="partnercaste"

  // placeholder="Enter username"
  id="partnercaste"
  onChange={(e)=>{
    setForm({...form, partnercaste:e.target.value})
  }}
  value={form.partnercaste}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>



</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Mother Tongue</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnermothertongue"
  name="partnermothertongue"

  // placeholder="Enter username"
  id="partnermothertongue"
  onChange={(e)=>{
    setForm({...form, partnermothertongue:e.target.value})
  }}
  value={form.partnermothertongue}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>




</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Education</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnereducation"
  name="partnereducation"

  // placeholder="Enter username"
  id="partnereducation"
  onChange={(e)=>{
    setForm({...form, partnereducation:e.target.value})
  }}
  value={form.partnereducation}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>

</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Occupation</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partneroccupation"
  name="partneroccupation"

  // placeholder="Enter username"
  id="partneroccupation"
  onChange={(e)=>{
    setForm({...form, partneroccupation:e.target.value})
  }}
  value={form.partneroccupation}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>





</div>



</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">State</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnerstate"
  name="partnerstate"

  // placeholder="Enter username"
  id="partnerstate"
  onChange={(e)=>{
    setForm({...form, partnerstate:e.target.value})
  }}
  value={form.partnerstate}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>

</div>
</div>

<div
style={{
  display: "flex",
  // gap: "30px",
  marginTop: "20px",
  // flexDirection: "row",
  width: "80%",
}}
>

<div
style={{
  display: "flex",
  width: "80%",
  flexDirection: "column",
}}
>
<label htmlFor="input1">Country of residence</label>
<input
  style={{
    width: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    paddingLeft: "10px",
    borderColor: "#F2F2F2",
    borderWidth: "3px",
    height: "30px",
  }}
  type="partnercountryofresidence"
  name="partnercountryofresidence"

 
  id="partnercountryofresidence"
  onChange={(e)=>{
    setForm({...form, partnercountryofresidence:e.target.value})
  }}
  value={form.partnercountryofresidence}
  onMouseEnter={(e) => {
    e.target.style.borderColor = "#87CEFA";
  }} // Change border color on hover
  onMouseLeave={(e) => {
    e.target.style.borderColor = "#F2F2F2";
  }} // Revert border color on mouse leave
/>


</div>
</div>




<div
  style={{
    display: "flex",
    width: "80%",
    marginTop: "20px",
    flexDirection: "row", // Change to row to align items horizontally
  }}
>
  <div
    style={{
      display: "flex",
      width: "80%",
      flexDirection: "column",
    }}
  >
    <label htmlFor="input1">Gallery</label>

    <input
      style={{
        display: "flex",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
        borderColor: "#F2F2F2",
        borderWidth: "3px",
        height: "30px",
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = "#87CEFA";
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = "#F2F2F2";
      }}
      type="file" // Use type="file" for uploading files
      id="input1"
      accept="image/*" // Accept only image files
      onChange={handleImageChange} // Call handleImageChange when image is selected
      multiple // Allow multiple file selection
    />
  </div>
</div>


<div
style={{
  display: "flex",
  gap: "30px",
  marginTop: "20px",
  flexDirection: "row",
  width: "80%",
}}
>
<div
  style={{
    display: "flex",
    width: "80%",
    flexDirection: "column",
  }}
>
  <label htmlFor="input1">Description</label>
  <input
    style={{
      width: "100%",
      cursor: "pointer",
      transition: "border-color 0.3s ease",
      paddingLeft: "10px",
      borderColor: "#F2F2F2",
      borderWidth: "3px",
      height: "250px",
    }}
    type="message"
    name="message"
    onChange={(e)=>{
      setForm({...form, message:e.target.value})
    }}
    value={form.message}
    id="message"
    onMouseEnter={(e) => {
      e.target.style.borderColor = "#87CEFA";
    }} // Change border color on hover
    onMouseLeave={(e) => {
      e.target.style.borderColor = "#F2F2F2";
    }} // Revert border color on mouse leave
  />

</div>
</div>
          <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "20px",
            flexDirection: "row",
            width: "80%",
          }}
          >
          <div
            style={{
              display: "flex",
              // width: "20%",
              flexDirection: "column",
            }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                cursor: "pointer",
                backgroundColor: "#DC3545",
                borderWidth: "3px",
                height: "35px",
              }}
            >
              Submit
            </button>
          </div>
          </div>
            </div>
      </div>
      <div>

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            marginTop: "20px",
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
    </div>
  );
};


export default Datasubmitform;





