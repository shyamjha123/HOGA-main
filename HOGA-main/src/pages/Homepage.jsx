import { useEffect, useState, useRef } from "react";
import "./Hompepage.css";
import "react-multi-carousel/lib/styles.css";
import { useSelector, useDispatch, } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Snow from "../snow/Snow";
import { getAllData } from "../redux/Profilelist";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash/isEqual";
import { Modal } from "@mui/material";
import "./Modal.css";
// import bannertwo from '../assets/bannertwo.png';
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Videos from "../videosslider/Videos";
import Profilecaraousel from "../profilecarousel/Profilecaraousel";
import Centerdata from "../homepagecenter/Centerdata";
import s1 from '../assets/ss-1.png';
import s2 from '../assets/ss-2.png';
import s3 from '../assets/ss-3.png';
import s4 from '../assets/ss-4.png';

function Homepage() {

  const audioRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const audio = new Audio('https://mobcup.com.co/wp-content/uploads/l1nsapqflbhqipggmi3qveojeqtiv121l.mp3');
    audio.loop = true; // Set loop to true for continuous playback

    const playAudio = () => {
      audio.play()
        .then(() => {
          console.log('Audio is playing');
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    };

    // Function to play audio when user interacts with the document
    const handleInteraction = () => {
      document.removeEventListener('click', handleInteraction);
      playAudio();
    };

    // Event listener to play audio when user interacts with the document
    document.addEventListener('click', handleInteraction);

    // Cleanup function to stop audio when component unmounts
    return () => {
      audio.pause();
      document.removeEventListener('click', handleInteraction);
    };
  }, []); // Empty dependency array ensures this effect runs only once, similar to co


  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);


  const [searchvalues, setSearchvalues] = useState({
    name: "",
    age: "",
    occupation: "",
    caste: "",
    color: "",
    height: "",
    city: "",
    religion: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [showMatchingCarousel, setShowMatchingCarousel] = useState(false); // Track whether to show the carousel with matching profiles


  const navigate = useNavigate();
  // const [userData, setUserData] = useState(null);
  // const [selectedItem, setSelectedItem] = useState(null); 



  const datastore = useSelector((state) => state.Profiledata.users);

  
  console.log('====================================');
  console.log(datastore, 'shyam babu');
  console.log('====================================');
  const dataArray = Object.values(datastore);
  const [sortedData, setSortedData] = useState([]);
  const prevSearchValues = useRef(searchvalues);

  useEffect(() => {
    if (!isEqual(prevSearchValues.current, searchvalues)) {
      const sorted = dataArray.sort((a, b) => {
        for (const key of Object.keys(searchvalues)) {
          if (a[key] && b[key]) {
            if (
              a[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
            ) {
              return -1;
            } else if (
              b[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
            ) {
              return 1;
            }
          }
        }
        return 0;
      });
      setSortedData(sorted);
      prevSearchValues.current = searchvalues;
    }
  }, [searchvalues, dataArray]);

  useEffect(() => {
    applySorting(datastore);
  }, [datastore]);

  const applySorting = (data) => {
    const sorted = dataArray.sort((a, b) => {
      for (const key of Object.keys(searchvalues)) {
        if (a[key] && b[key]) {
          if (
            a[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
          ) {
            return -1;
          } else if (
            b[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
          ) {
            return 1;
          }
        } else if (a[key] && !b[key]) {
          return -1;
        } else if (!a[key] && b[key]) {
          return 1;
        }
      }
      return 0;
    });
    setSortedData(sorted);
  };

  useEffect(() => {
    if (!isEqual(prevSearchValues.current, searchvalues)) {
      const sorted = Object.values(data).sort((a, b) =>
        Object.keys(searchvalues).reduce((acc, key) => {
          if (a[key] && b[key]) {
            return acc ||
              a[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
              ? -1
              : b[key].toLowerCase().startsWith(searchvalues[key].toLowerCase())
              ? 1
              : 0;
          }
          return acc;
        }, 0)
      );
      setSortedData(sorted);
      prevSearchValues.current = searchvalues;
    }
  }, [searchvalues]);
  // const [showContent, setShowContent] = useState(false);
  // const [item, setItem] = useState(false);
  const [data, setData] = useState(false);
 


  const handleWhatsAppClick = (userData) => {
    const { name, age, caste, city, imagePath, state } = userData;
    const phoneNumber = "917568111771";

    const message = `Hi, I'm interested in your profile. My name is ${name}, age is ${age}, caste is ${caste} , City is ${city}, state is ${state}   `  ; 
    // const message = 'dfdfdfdfdfdfdf'
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  


    window.open(url, "_blank");
    // Log the constructed URL and message for debugging
    console.log("WhatsApp API URL:", url);
    console.log("WhatsApp Message:", message);
  
  };
  

  const handleFormSubmit = (formData) => {
    const matches = sortedData.filter((profile) => {
      return Object.keys(formData).some((key) => {
        return profile[key] === formData[key];
      });
    });
    setMatchingProfiles(matches);
    setShowMatchingCarousel(matches.length > 0); // Show the matching carousel if there are matches
    setOpenModal(false);

    if (matches.length > 0) {
      alert(`Found ${matches.length} matching profiles.`);
    } else {
      alert("No matching profiles found.");
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

 
  const handleCardClick = (item) => {
    // Navigate to Userdetail page with item details as state
    navigate('/Userdetail', { state: { item } });
  };
  return (
    <div  ref={audioRef} style={{ display: "flex", flexDirection: "column" }}>
    <Navbar/>
      <Snow />

     <div className="banner">
    <div className="text-desktop">

      <span style={{fontSize:"27px", color:"#F5F5DC",  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily:"Roboto",  fontweight:"bold"}}>Every love story begins with a click: <br></br> Start yours at Hogamilan</span>

      <button onClick={()=>{
        navigate('/Allprofile')
      }} class="button-desktop">see profiles</button>
     
    </div>
    <div className="text-mobile">

      <span style={{fontSize:"20px",textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily:"revert",  fontweight:"Roboto", color:"#F5F5DC", textAlign:'center', paddingRight:"35px"}}>Hogamilan: Your Love Story, <br></br>One Click Away</span>
       
      <button  onClick={()=>{
        navigate('/Allprofile')
      }}   class="button-mobile">see profiles</button>
    </div>
  </div>
     
<div style={{display:"flex", justifyContent:"center", alignItems:'center', marginTop:'20px'}}>
      <button onClick={()=>{
        navigate('/Loginpage')
      }} style={{width:"200px", boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", height:"50px", backgroundColor:"#DC3545",color:"white", borderRadius:"20px", borderColor:"#fff", }}>Register yourself</button>

      </div>
<h2 style={{fontSize:"33px", textAlign:"center", color:"#ba1d2a", textShadow:"none", marginTop:"35px", marginBottom:'24px'}}>MATRIMONY PROPOSALS</h2>
<h5 style={{textAlign:"center",fontweight:"bold", lineHeight:"25px", color:"#222", fontSize:"13.5px", fontFamily:"Poppins-Regular", width:"100%"}}>Marriage Bureau for all Community</h5>


<form
onSubmit={(e) => {
  e.preventDefault();
  handleFormSubmit(searchvalues);
}}
>
<div style={{display:"flex", justifyContent:'center', alignItems:"center", marginTop:"20px"}}>
      <div style={{display:"flex", width:"400px",height:'230px', backgroundColor:"#fff",boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", flexDirection:"column", gap:20, justifyContent:"center", alignItems:"center", borderRadius:"20px" }} >
      <div style={{display:"flex",gap:10 }}>
      <input
      style={{width:"170px", height:"35px", borderColor:"#fff" , boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", paddingLeft:"20px"}}
      type="text"
      placeholder="name"
      onChange={(e) =>
        setSearchvalues({ ...searchvalues, name: e.target.value })
      }
      value={searchvalues.name}
      // className="modal-input"
    />
    <input
    style={{width:"170px", height:"35px", borderColor:"#fff" , boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", paddingLeft:"20px"}}
    type="text"
    placeholder="Age"
    onChange={(e) =>
      setSearchvalues({ ...searchvalues, age: e.target.value })
    }
    value={searchvalues.age}
    // className="modal-input"
  />
    </div>
    <div style={{display:"flex",gap:10}}>
    <input
    style={{width:"170px", height:"35px", borderColor:"#fff" , boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)",paddingLeft:"20px"}}
    type="text"
    placeholder="Caste"
    onChange={(e) =>
      setSearchvalues({ ...searchvalues, caste: e.target.value })
    }
    value={searchvalues.caste}
    // className="modal-input"/
  />

  <input
  style={{width:"170px", height:"35px", borderColor:"#fff" , boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)",paddingLeft:"20px"}}
  type="text"
  placeholder="City"
  onChange={(e) =>
    setSearchvalues({ ...searchvalues, city: e.target.value })
  }
  value={searchvalues.city}
  // className="modal-input"
/>
  </div>
  <button
  style={{
    color:"#fff",
    borderColor:"#fff",
    backgroundColor: "#DC3545",
    boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)",
    width: "360px",
    height: "45px",
    borderRadius: "10px",
  }}
  type="submit"
>
  Search
</button>
      </div>
      </div>
     </form>
      
      {showMatchingCarousel && matchingProfiles.length > 0 && (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          renderButtonGroupOutside={true}
          arrows={false}
        >
        {sortedData.map((item, index) => (

          
          <div   onClick={() => handleCardClick(item)} class="card" style={{width: '70%',  cursor:"pointer", boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", borderRadius:"20px", height:"410px", marginLeft:"70px",marginTop:"40px",backgroundColor:"#fff", alignItems:'center', borderColor:"gray"}}>
          <div style={{width:"100%", height:"50%"}}>
          {item.imagePath && item.imagePath[0] && (
          <img src={item.imagePath[0]} style={{width:"100%", height:'100%',  borderRadius:"20px"}}  />
          )}
          </div>
            <div style={{display:'flex',  alignItems:'center', flexDirection:'column'}}>
           
            <button  style={{display:"flex",borderColor:'#fff', marginTop:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.5)", justifyContent:'center', width:"200px", borderRadius:"10px", height:"40px", alignItems:'center', backgroundColor:"#DC3545", color:"#ffF"}} onClick={()=>{
              handleWhatsAppClick(item)
            }}>Contact now</button>
       </div>

          <div style={{display:"flex",flexDirection:'row',justifyContent:"flex-start",  gap:20,marginTop:"20px",}}>
            <span
            style={{
              // marginTop:"10px",
              fontSize: "15px",
              fontWeight: "bold",
                // fontWeight: "bold",
                color: "#333",
                fontFamily: "inherit",
     
              // textAlign:'center'
            }}
          >
        {item.name}
          </span>
        
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
                // fontWeight: "bold",
                color: "#333",
                fontFamily: "inherit",
              // textAlign:'center'
            }}
          >
             {item.age}
          </span>
          </div>
     
<div style={{display:"flex",flexDirection:'row',justifyContent:"flex-start",gap:20}}>
          <span
          style={{
            fontSize: "15px",
            fontWeight: "bold",
              // fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
     
            // textAlign:'center'
          }}
        >
           {item.caste}
        </span>
       
     
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
                // fontWeight: "bold",
                color: "#333",
                fontFamily: "inherit",
     
              // textAlign:'center'
            }}
          >
           {item.city}
          </span>
          </div>

          <span
          style={{
            fontSize: "15px",
            fontWeight: "bold",
              // fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
     
            // textAlign:'center'
          }}
        >
         {item.currentstate}
        </span>
    
           
          </div>
           
        ))}
        </Carousel>
      )}

      {!showMatchingCarousel && (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          renderButtonGroupOutside={true}
          arrows={false}
        >
          {sortedData.map((item, index) => (
         
          
            <div   onClick={() => handleCardClick(item)} class="card" style={{width: '70%',  cursor:"pointer", boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", height:"410px", borderRadius:"10px", marginLeft:"70px",marginTop:"40px",backgroundColor:"#fff", alignItems:'center', borderColor:"gray",}}>
          <div style={{width:"100%", height:"50%"}}>
          {item.imagePath && item.imagePath[0] && (
          <img src={item.imagePath[0]} style={{width:"100%", height:'100%',  borderRadius:"20px"}}  />
          )}
          </div>
            <div style={{display:'flex',  alignItems:'center', flexDirection:'column'}}>
           
            <button  style={{display:"flex",borderColor:'#fff', marginTop:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.5)", justifyContent:'center', width:"200px", borderRadius:"10px", height:"40px", alignItems:'center', backgroundColor:"#DC3545", color:"#ffF"}} onClick={()=>{
              handleWhatsAppClick(item)
            }}>Contact now</button>
       </div>

          <div style={{display:"flex",flexDirection:'row',justifyContent:"flex-start",  gap:20,marginTop:"20px",}}>
            <span
            style={{
              // marginTop:"10px",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
     
              // textAlign:'center'
            }}
          >
        {item.name}
          </span>
        
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              // fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
              // textAlign:'center'
            }}
          >
             {item.age}
          </span>
          </div>
     
<div style={{display:"flex",flexDirection:'row',justifyContent:"flex-start",gap:20}}>
          <span
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            // fontWeight: "bold",
            color: "#333",
            fontFamily: "inherit",
     
            // textAlign:'center'
          }}
        >
           {item.caste}
        </span>
       
     
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              // fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
     
              // textAlign:'center'
            }}
          >
           {item.city}
          </span>
          </div>

          <span
          style={{
            fontSize: "15px",
            fontWeight: "bold",
              // fontWeight: "bold",
              color: "#333",
              fontFamily: "inherit",
     
            // textAlign:'center'
          }}
        >
         {item.currentstate}
        </span>
    
           
          </div>
        
             
          ))}
        </Carousel>
      )}



      <div style={{display:"flex", justifyContent:"center", alignItems:'center', marginTop:'20px'}}>
      <button onClick={()=>{
        navigate('/Allprofile')
      }} style={{width:"200px", boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)", height:"50px", backgroundColor:"#DC3545",color:"white", borderRadius:"20px", borderColor:"#fff", }}>See more profiles</button>

      </div>
   
      <div style={{display:"flex", marginTop:"40px", gap:30, alignItems:'center', backgroundColor:"#fff",   }} className="main-container">
      <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:'center',   }}>
      <div className="special-someone-inner"> 
      <img src={s1} />
      </div>
      <h3 style={{fontweight:"bold",textAlign:"center",fontSize:"20px", fontFamily:"sans-serif", color:"#362109"}}>Create your profile</h3>
      <p style={{textAlign:"center",fontSize:"14px", fontFamily:"sans-serif", color:"#3d3d3d", lineHeight:"23px"}}>Honestly you search for a life Partner? Simple! Create your Matrimonial Profile, fill all about you and your partner preference, Upload photo. Done?</p>
      </div>
      <div  style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:'center', }}>
      <div className="special-someone-inner"> 
      <img  src={s2}/>
      </div>
      <h3 style={{fontSize:"20px",textAlign:"center", fontFamily:"sans-serif", color:"#362109"}}>Find Compatible</h3>
      <p style={{textAlign:"center",fontSize:"14px", fontFamily:"sans-serif", color:"#3d3d3d", lineHeight:"23px"}}>Choose your match from thousands  of profile; View the Profile Photo, Education, Income, Location, Cast, Family details, Horoscope Details etc.Yes?</p>
      </div>
      <div  style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center', }}>
      <div className="special-someone-inner"> 
      <img src={s3}/>
      </div>
      <h3 style={{fontSize:"20px",textAlign:"center", fontFamily:"sans-serif", color:"#362109"}}>Get to knowthem</h3>
      <p style={{textAlign:"center",fontSize:"14px", fontFamily:"sans-serif", color:"#3d3d3d", lineHeight:"23px"}}>You Shortlisted Some Profile to  Proceed, Want to know more details about them? Connect With our Relationship Manager to help for Meeting. Going Well?</p>
      </div>
      <div  style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center',}}>
      <div className="special-someone-inner"> 
      <img  src={s4}/>
      </div>
      <h3 style={{fontSize:"20px",textAlign:"center", fontFamily:"sans-serif", color:"#362109"}}>Find love!</h3>
      <p style={{textAlign:"center",fontSize:"14px", fontFamily:"sans-serif", color:"#3d3d3d", lineHeight:"23px"}}>It’s not until you connect with a  person that makes you their perfect match, it's when you are satisfied with each other’s peculiarities.</p>
      </div>
      
      </div>

  <Videos/>

  <div
  className="jammer"
>
</div>
    
      <span
        style={{
          textAlign: "center",
          marginTop: "80px",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "500",
          fontFamily: "serif",
          lineHeight: 1.2,
        }}
      >
        Best & Trusted Matrimony Website
      </span>
 
 <Centerdata/>


      <div
        style={{
          display: "flex",
          marginTop: "80px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // gap:"20px"
        }}
      >
        <h1>Success Stories</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <span style={{ textAlign: "center" }}>
            Presenting the family of the happy couples who found their sundar
            jodidar via this free matchmaking website .
          </span>
          <span style={{ textAlign: "center" }}>
            If your story was also directed by us, send your engagement or
            wedding photos and get featured on our hall of sundar stories.
          </span>
        </div>
      </div>
      <br></br>
<div style={{display:"flex", flexDirection:"column", marginLeft:"40px", marginTop:"20px"}}>
     <Profilecaraousel/>
     </div>
    
     <Footer/> 
 
    </div>
  );
}

export default Homepage;
