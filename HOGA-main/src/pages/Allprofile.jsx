import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData } from '../redux/Profilelist';
import Logo from "../assets/logo.jpg";
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; 

function Allprofile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.Profiledata.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const pagesToShow = Math.floor(width / 40); // Adjust based on your design
      setVisiblePages(pagesToShow);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = datastore.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (item) => {
    // Navigate to Userdetail page with item details as state
    navigate('/Userdetail', { state: { item } });
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <div style={{ display: "flex", flexDirection: "column" }}>
    
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
                navigate("/");
              }}
            >
              <button style={{ width: "200px", borderRadius: "20px", height: "40px", backgroundColor: "#DC3545", borderColor: 'white', color: 'white' }} >Home</button>
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


      <h1 style={{ fontSize: "30px", fontFamily: "sans-serif", marginTop: "30px",paddingLeft:"20px", color: "red", }}>Allprofile Details Listing</h1>

      {currentCards.map((item, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '20px', paddingTop: "20px" }}>
          <div style={{ display: 'flex', width: '70%',  borderRadius:"20px", marginLeft:"20px",  height: '200px', }}>
            <div style={{ display: 'flex', width: "40%", height: "200px" }}>
            {item.imagePath && item.imagePath[0] && (
              <img src={item.imagePath[0]} style={{ width: "100%", height: "100%" }} alt={`Profile ${index}`} />
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: "column", marginLeft: "50px", marginTop:'30px' }}>
              <span style={{fontSize:'20px', fontFamily:"inherit", fontWeight:"500" ,color:"red" }}> {item.name}</span>
              <div style={{display:"flex", flexDirection:"row", gap:20}}>
                <span style={{fontSize:'18px', fontFamily:"initial", }}> {item.age}</span>
                <span style={{fontSize:'18px', fontFamily:"initial", }}> {item.caste}</span>
              </div>
              <span  key={index} onClick={() => handleCardClick(item)} style={{color:"#DC3545", fontWeight:"500", fontSize:"15px", cursor:"pointer"}}>View full profile</span>
            </div>
          </div>
        </div>
      ))}

      <ul className="pagination justify-content-center">
        {datastore.map((item, index) => {
          if (index < visiblePages) {
            return (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} style={{ margin: '0 5px', cursor: 'pointer' }}>
                <span className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</span>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  )
}

export default Allprofile;
