import React from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import './Userprofilestyle.css';

function Userprofile() {
    const location = useLocation();
    const selectedItem = location.state ? location.state.selectedItem : null; // Check if location.state exists
  console.log('====================================');
  console.log(selectedItem, 'ffdf');
  console.log('====================================');
    if (!selectedItem) {
      return <div>No item selected.</div>; // Return early if selectedItem is null
    }
  

  return (
    <div   className="user-profile-container">
    <p style={{fontSize:"30px",color:"#DC3545", fontWeight:"500", fontFamily:"cursive"}}> User Detail</p>

    <Avatar
    alt="Remy Sharp"
    src={selectedItem.imagePath}
    sx={{ width: 120, height: 120 }}
  />

  <div className="profile-details">
  <span style={{fontSize:"30px", fontWeight:"bold" , color:"green"}}>About myself</span>
  <div className="profile-row">
  
    <span  >Name:{selectedItem.name}</span>
    <span  >Middlename:{selectedItem.middlename}</span>
    <span >Surname:{selectedItem.surname}</span>
    </div>
    <div className="profile-row">
    <span >Caste:{selectedItem.caste}</span>
    <span >Castesubcaste:{selectedItem.
      casteSubcaste
      }</span>
    <span >Nickname:{selectedItem.nickname}</span>
    </div>
    <div className="profile-row">
    <span >Religion:{selectedItem.religion}</span>
    <span >Dateofbirth:{selectedItem.dateOfBirth}</span> 
    <span >Timeofbirth:{selectedItem.timeofbirth}</span> 
    </div>
    <div className="profile-row">
    <span >Placeofbirth:{selectedItem.placeofbirth}</span> 
    <span >Stateofbirth:{selectedItem.stateofbirth}</span> 
    <span >Age:{selectedItem.age}</span>
    </div>
    <div className="profile-row">
    <span>Height:{selectedItem.height}</span> 
    <span >Weight:{selectedItem.weight}</span> 
    <span >Village:{selectedItem.village}</span>

    </div>
    <div className="profile-row">
    <span >City:{selectedItem.city}</span>
    <span >Pin code:{selectedItem.pincode}</span>
    <span >District:{selectedItem.district}</span>
    </div>
    <div className="profile-row">
    <span >State:{selectedItem.state}</span>
    <span >Country:{selectedItem.country}</span>
    <span >Nationality:{selectedItem.nationality}</span>
    </div>
    <div className="profile-row">
    <span >Education:{selectedItem.education}</span> 
    <span >Educationdetail:{selectedItem.educationdetail}</span> 
    <span  >Physicalstatus:{selectedItem.physicalstatus}</span> 

    </div>
    <div className="profile-row">
    <span >Gotrarashi:{selectedItem.gotrarashi}</span>
    <span >Gotradada:{selectedItem.gotradada
    }</span>
    <span >Gotradadi:{selectedItem.gotradadi}</span>

    </div>
 
    <div className="profile-row">

    <span  >Gotranana:{selectedItem.gotranana}</span>
    <span  >Gotranani:{selectedItem.gotranani}</span>
    <span >Bloodgroup:{selectedItem.bloodgroup}</span> 
    </div>

    <div className="profile-row">
      
    <span >Body type:{selectedItem.bodytype}</span> 
    <span >Hobbies:{selectedItem.hobbies}</span> 
    <span >Mother Tongue:{selectedItem.mothertongue}</span> 
 
    </div>
    <div className="profile-row">
    <span >Smoke:{selectedItem.smoke}</span> 
    <span >Drink:{selectedItem.drink}</span> 
    <span >Diet:{selectedItem.diet}</span> 
   
 
        </div>
        <div className="profile-row">
        <span >Single:{selectedItem.single}</span> 
        <span >Divorce:{selectedItem.divorce}</span> 
        <span >Widow:{selectedItem.widow}</span> 
  
 
    </div>
    <span style={{fontSize:"30px", fontWeight:"bold" , color:"green"}}>Partner preference </span>
    <div  className="profile-row">
    <span >Age range:{selectedItem.ageto}</span> 
    <span >Single:{selectedItem.partnersingle}</span> 
    <span >Divorce:{selectedItem.partnerdivorce}</span> 
    

   </div>
   <div  className="profile-row">
   <span >Widow:{selectedItem.partnerwidow}</span> 
   <span >Widower:{selectedItem.partnerwidower}</span> 
   <span >No of children:{selectedItem.partnernoofchildren}</span> 
  
  
   </div>
   <div className="profile-row">
   <span >Body type:{selectedItem.partnerbodytype}</span> 
   <span >Complextion:{selectedItem.partnercomplextion}</span> 
   <span >Height:{selectedItem.partnerheight}</span> 

  
   </div>
   <div className="profile-row">

   <span >Weight:{selectedItem.partnerweight}</span> 
   <span >Diet:{selectedItem.partnerdiet}</span> 
   <span >Religion:{selectedItem.partnerreligion}</span> 
   </div>
    </div>
    </div>
  )
}

export default Userprofile
