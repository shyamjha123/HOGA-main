import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.jpg";

import { Drawer, List, ListItem, ListItemText } from "@mui/material";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; 

// import Logo from "../assets/logo.jpg";


function Userdetail() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const location = useLocation();
  const { item } = location.state;
  
  const isEmpty = (value) => {
    return value === null || value === undefined || value === "";
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
 //item.imagePath
  return (
    <div style={{display:"flex",  flexDirection:"column", }}>
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
              <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: "white", color: "white" }} >User dashboard</button>
              </ListItem>


              
            </List>
          </div>
        </Drawer>
      </div>
    </nav>
  </div>

 
      <div >
    
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{marginTop:"40px"}}>
      <div className="carousel-inner">
      {item.imagePath && item.imagePath.map((itemstore, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} >
            <img src={itemstore} className="d-block w-75  mx-auto img-fluid" alt={`Slide ${index}`} style={{maxHeight: '390px'}} />
          </div>
        ))}
      </div>
    
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" style={{left: "20%", right: "auto"}}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" style={{right: "20%", left: "auto"}}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      <div   style={{marginTop:"20px", display:"flex", flexDirection:"column", gap:20, paddingLeft:"30px"}}
      >
        <h5 className="card-title"  style={{fontSize:"30px", color:"#DC3545",marginBottom:'60px' }}>Profile details</h5>
        <table>
        <tbody>

        {!isEmpty(item.name) &&
          <tr >
  
            <td style={{ width: "150px", color:"black" }}>Name:- </td>
          <span style={{marginRight:"30px"}}>:</span>
          
            <td style={{fontWeight:"bold", color:"black"}}>  {item.name}</td>
      
          </tr>
        }
        {!isEmpty(item.middlename) &&
          <tr>
            <td style={{ width: "150px", color:"black" }}>Middle name:-</td>
            <spa>:</spa>
            <td style={{fontWeight:"bold", color:"black"}}>{item.middlename}</td>
          </tr>
        }
          {/* Repeat similar structure for other details */}
       
    
          {!isEmpty(item.nickname) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Nick name:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.nickname}</td>
            </tr>
          }
          {!isEmpty(item.nickname) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Surname:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.surname}</td>
            </tr>
          }
          {!isEmpty(item.caste) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Caste:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.caste}</td>
            </tr>
          }
          {!isEmpty(item.casteSubcaste) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Castesubaste:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.casteSubcaste}</td>
            </tr>
          }
          {!isEmpty(item.casteSubcaste) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Religion:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.religion}</td>
            </tr>
          }
          {!isEmpty(item.dateOfBirth) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Date of birth:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.dateOfBirth}</td>
            </tr>
          }
          {!isEmpty(item.timeofbirth) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Time of birth:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.timeofbirth}</td>
            </tr>
          }
          {!isEmpty(item.placeofbirth) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Place of birth:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.placeofbirth}</td>
            </tr>
          }
          {!isEmpty(item.birthvillage) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Village of birth:-   </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.birthvillage}</td>
            </tr>
          }
          {!isEmpty(item.birthcity) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Birth City:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.birthcity}</td>
            </tr>
          }
          {!isEmpty(item.stateofbirth) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>State of birth:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.stateofbirth}</td>
            </tr>
          }
          {!isEmpty(item.age) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Age:-   </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.age}</td>
            </tr>
          }
          {!isEmpty(item.height) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Height:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.height}</td>
            </tr>
          }
          {!isEmpty(item.weight) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Weight:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.weight}</td>
            </tr>
          }
          {!isEmpty(item.city) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Current city:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.city}</td>
            </tr>
          }
          {!isEmpty(item.village) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Current Village:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.village}</td>
            </tr>
          }
          {!isEmpty(item.district) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> District:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.district}</td>
            </tr>
          }
          {!isEmpty(item.currentstate) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Current state:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.currentstate}</td>
            </tr>
          }
          {!isEmpty(item.pincode) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Pin code:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.pincode}</td>
            </tr>
          }


          {!isEmpty(item.country) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Country:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.country}</td>
            </tr>
          }

          {!isEmpty(item.nationality) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Nationality:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.nationality}</td>
            </tr>
          }
          {!isEmpty(item.education) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Education:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.education}</td>
            </tr>
          }
          {!isEmpty(item.educationdetail) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Education detail:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.educationdetail}</td>
            </tr>
          }
          {!isEmpty(item.physicalstatus) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Physical status:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.physicalstatus}</td>
            </tr>
          }
          {!isEmpty(item.gotrarashi) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Gotra rishi:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.gotrarashi}</td>
            </tr>
          }
          {!isEmpty(item.gotradada) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Gotra dada:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.gotradada}</td>
            </tr>
          }
          {!isEmpty(item.gotradadi) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Gotra dadi:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.gotradadi}</td>
            </tr>
          }
          {!isEmpty(item.gotranana) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Gotra nana:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.gotranana}</td>
            </tr>
          }

          {!isEmpty(item.gotranani) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Gotra nani:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.gotranani}</td>
            </tr>
          }

          {!isEmpty(item.manglik) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Manglik:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.manglik}</td>
            </tr>
          }
        
          {!isEmpty(item.rashi) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Rashi:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.rashi}</td>
            </tr>
          }

          {!isEmpty(item.star) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Star:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.star}</td>
            </tr>
          }

          {!isEmpty(item.bloodgroup) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Blood group:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.bloodgroup}</td>
            </tr>
          }
          {!isEmpty(item.bodytype) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}> Body type:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.bodytype}</td>
            </tr>
          }
          {!isEmpty(item.complexion) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Complextion:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.complexion}</td>
            </tr>
          }
          {!isEmpty(item.hobbies) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Hobbies:-</td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.hobbies}</td>
            </tr>
          }
          {!isEmpty(item.mothertongue) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Mother tongue:- </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.mothertongue}</td>
            </tr>
          }
          {!isEmpty(item.creation) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Profile created by:-   </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.creation}</td>
            </tr>
          }
          {!isEmpty(item.smoke) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Smoke:-   </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.smoke}</td>
            </tr>
          }
          {!isEmpty(item.drink) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Drink:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.drink}</td>
            </tr>
          }
          {!isEmpty(item.diet) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Diet:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.diet}</td>
            </tr>
          }
          {!isEmpty(item.status) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Marital status:-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.status}</td>
            </tr>
          }
          {!isEmpty(item.noofchildren) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>No. of children:-   </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.noofchildren}</td>
            </tr>
          }
          {!isEmpty(item.emailid) &&
            <tr>
              <td style={{ width: "150px", color:"black" }}>Email id :-  </td>
              <span>:</span>
              <td style={{fontWeight:"bold", color:"black"}}>{item.emailid}</td>
            </tr>
          }
        </tbody>
  </table>


        <h5 className="card-title" style={{ fontSize: "30px", color: "#DC3545",marginBottom:'60px'  }}>Occupation details</h5>
        <table>
        <tbody>
        {!isEmpty(item.jobstatus) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Job type:-</td>
            <span style={{marginRight:"30px"}}>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.jobstatus}</td>
       
          </tr>
        }

        {!isEmpty(item.monthlyincome) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Monthly Income:-  </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.monthlyincome}</td>
       
          </tr>
        }

         {!isEmpty(item.annualIncome) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Annual Income:-  </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.annualIncome}</td>
       
          </tr>
        }
      
        </tbody>
        </table>
  
       
        <h5 className="card-title" style={{fontSize:"30px", color:"#DC3545",marginBottom:'60px' }}>Family details</h5>
        <table>
        <tbody>
        {!isEmpty(item.fathername) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Father name:-   </td>
            <span style={{marginRight:"30px"}}>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.fathername}</td>
       
          </tr>
        }

        {!isEmpty(item.fatheroccupation) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Father Occupation:-      </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.fatheroccupation}</td>
       
          </tr>
        }
        {!isEmpty(item.mothername) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Mother Name:-      </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.mothername}</td>
       
          </tr>
        }
        {!isEmpty(item.motheroccupation) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Mother Occupation:-      </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.motheroccupation}</td>
       
          </tr>
        }
        {!isEmpty(item.noofbothers) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>No of brothers:-    </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.noofbothers}</td>
       
          </tr>
        }
        {!isEmpty(item.brothermaritalstatus) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Brother marital status:-  </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.brothermaritalstatus}</td>
       
          </tr>
        }
        {!isEmpty(item.nosisters) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>No. sisters:-  </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.nosisters}</td>
       
          </tr>
        }
        {!isEmpty(item.sistersmaritalstatus) &&
          <tr>
       
            <td style={{ width: "150px", color:"black" }}>Sisters marital status:-   </td>
            <span>:</span>
            <td style={{fontWeight:"bold", color:"black"}}>{item.sistersmaritalstatus}</td>
       
          </tr>
        }
        </tbody>
        </table>
       <h5 className="card-title" style={{fontSize:"30px" , color:"#DC3545",marginBottom:'60px' }}>Partner prefernce and marital status</h5>
       <table>
       <tbody>
       {!isEmpty(item.ageto) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Age upto :-   </td>
          <span style={{marginRight:"30px"}}>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.ageto}</td>
     
        </tr>
      }
      {!isEmpty(item.partnermaritalstatus) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Marital status :-   </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnermaritalstatus}</td>
     
        </tr>
      }
      {!isEmpty(item.partnernoofchildren) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>No. of children:-   </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnernoofchildren}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerbodytype) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Body type:-   </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerbodytype}</td>
     
        </tr>
      }
      {!isEmpty(item.partnercomplextion) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Complextion:-     </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnercomplextion}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerheight) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Height:-     </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerheight}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerweight) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Weight:-      </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerweight}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerdiet) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Diet:-      </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerdiet}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerreligion) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Religion:-     </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerreligion}</td>
     
        </tr>
      }
      {!isEmpty(item.partnercaste) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Caste:-    </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnercaste}</td>
     
        </tr>
      }
      {!isEmpty(item.partnermothertongue) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Mother tongue:-    </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnermothertongue}</td>
     
        </tr>
      }
      {!isEmpty(item.partnereducation) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Education:-   </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnereducation}</td>
     
        </tr>
      }
      {!isEmpty(item.partneroccupation) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Occupation:-    </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partneroccupation}</td>
     
        </tr>
      }
      {!isEmpty(item.partnerstate) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>State:-    </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnerstate}</td>
     
        </tr>
      }
      {!isEmpty(item.partnercountryofresidence) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Country of residence:-   </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.partnercountryofresidence}</td>
     
        </tr>
      }
      {!isEmpty(item.message) &&
        <tr>
     
          <td style={{ width: "150px", color:"black" }}>Message  </td>
          <span>:</span>
          <td style={{fontWeight:"bold", color:"black"}}>{item.message}</td>
     
        </tr>
      }
       </tbody>
       </table>
      </div>
    </div>

    </div>
  )
}

export default Userdetail
