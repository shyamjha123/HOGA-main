import React, {useState} from 'react';

import { Grid, Paper } from "@mui/material";

function Centerdata() {
    const [userData, setUserData] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); 

    const [showContent, setShowContent] = useState(false);
  const [item, setItem] = useState(false);
  const [data, setData] = useState(false);
    const [store, setStore] = useState(false);
    const [dataitem, setDataitem] = useState(false);
    const [storeitem, setStoreitem] = useState(false);
    const [mount, setMount] = useState(false);
    
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleOpen = () => {
    setItem(!item);
  };

  const handleClose = () => {
    setData(!data);
  };

  const handleData = () => {
    setDataitem(!dataitem);
  };

  const handleStore = () => {
    setStore(!store);
  };

  const handleStoreItem = () => {
    setStoreitem(!storeitem);
  };

  const handleMount = () => {
    setMount(!mount);
  };

  return (
    <>
    <Grid container spacing={4} style={{ marginTop: "20px",  }}>
    {/* Left section on small screens */}
    <Grid item xs={12} sm={6}>
      <Paper style={{ height: "auto", padding: "20px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src="https://sundarjodi.com/img/bg1.jpg"
        />
      </Paper>
    </Grid>

    {/* Right section on small screens */}
    <Grid item xs={12} sm={6}>
      <Paper
        style={{
          height: "auto",
          padding: "20px",
        }}
      >
        {/* My Profile List 1 */}
        <div className="profileList">
          <div className="content">
            <p>
              Our Hogamilan matrimony site allows thousands of verified
              profiles
            </p>
            <div className="toggleBtn" onClick={toggleContent}>
              {showContent ? "-" : "+"}
            </div>
          </div>
          {showContent && (
            <div className="content">
              As one of the leading matrimony sites, we believe that there
              should not be any compromise while selecting your life
              partner. Our Vadhu Var Suchak Kendra has served lakhs of
              singles who have found their ideal match with active 5000+
              verified profiles.
            </div>
          )}
        </div>

        {/* My Profile List 2 */}
        <div className="profileList">
          <div className="content">
            <p>
              Find a perfect life partner from one of the leading Matrimony
              Sites Hogamilan
            </p>
            <div className="toggleBtn" onClick={handleOpen}>
              {item ? "-" : "+"}
            </div>
          </div>
          {item && (
            <div className="content">
              We understand that in Hogamilan matrimony is not just a union
              of two individuals but two families. We offer profiles from
              400+ castes to find your future spouse that would be the
              perfect addition to your family.
            </div>
          )}
        </div>

 
        <div className="profileList">
          <div className="content">
            <p>
              Hogamilan matrimonial site that is dedicated to matchmaking
            </p>
            <div className="toggleBtn" onClick={handleClose}>
              {data ? "-" : "+"}
            </div>
          </div>
          {data && (
            <div className="content">
              Matchmaking is not simply business for us; it is an emotion.
              It gives us great pleasure to see two people happily settled
              in matrimony. Sundar Jodi as a Vadhu Var Suchak has proudly
              fixed successful matches till now.
            </div>
          )}
        </div>

        {/* My Profile List 4 */}
        <div className="profileList">
          <div className="content">
            <p>
              Hogamilan matrimony site with a blend of Tradition and
              Technology
            </p>
            <div className="toggleBtn" onClick={handleData}>
              {dataitem ? "-" : "+"}
            </div>
          </div>
          {dataitem && (
            <div className="content">
              In the present time, it is necessary to blend our traditions
              with technology to find your soul mate. As one of the trusted
              matrimony Hogamilan sites, we find matches both online and
              offline based on caste, family culture, and horoscopes.
            </div>
          )}
        </div>

        {/* My Profile List 5 */}
        <div className="profileList">
          <div className="content">
            <p>
              Hogamilan matrimony site with filters to find your perfect
              match
            </p>
            <div className="toggleBtn" onClick={handleStore}>
              {store ? "-" : "+"}
            </div>
          </div>
          {store && (
            <div className="content">
              With liberal thoughts and values among couples, they prefer to
              marry someone who is their equal and meets their expectations
              of compatibility. On our Marathi matrimonial website, you can
              filter your options on the basis of education background, job,
              state/city of residence, etc.
            </div>
          )}
        </div>

        {/* My Profile List 6 */}
        <div className="profileList">
          <div className="content">
            <p>
              Hogamilan Matrimonial Website with 100% Data Security and
              Privacy
            </p>
            <div className="toggleBtn" onClick={handleStoreItem}>
              {storeitem ? "-" : "+"}
            </div>
          </div>
          {storeitem && (
            <div className="content">
              Your data security is of utmost importance to us. As one of
              the reputed matrimonial Hogamilan sites, we undertake every
              precaution and effort to ensure that your information on this
              platform is completely safe.
            </div>
          )}
        </div>

        {/* My Profile List 7 */}
        <div className="profileList">
          <div className="content">
            <p>Help Center and Online Support</p>
            <div className="toggleBtn" onClick={handleMount}>
              {mount ? "-" : "+"}
            </div>
          </div>
          {mount && (
            <div className="content">
              Matrimony is a big decision in anyone’s life, and the
              matrimony site Marathi is here to support and help you in
              every step you take to find your better half.
            </div>
          )}
        </div>
      </Paper>
    </Grid>
  </Grid>
    </>
  )
}

export default Centerdata
