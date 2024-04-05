import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
// import Navbar from "../common/Navbar";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import Datasubmitform from "../screen/Datasubmitform";
import Errorscreen from "../screen/Errorscreen";
import Forgotpassword from "../screen/Forgotpassword";
// import Profilepage from "../pages/Profilepage";
import Adminpage from "../pages/Adminpage";
import Admindashboard from "../pages/Admindashboard";
// import Adminpages from "../screen/Adminpages";

import Userprofile from "../pages/Userprofile";
import Allprofile from "../pages/Allprofile";
import Userdetail from "../pages/Userdetail";
import Mydetail from "../screen/Mydetail";
// import Homepage from "../screen/Splashscreen";
import Splashscreen from "../screen/Splashscreen";
import Userprofilesdetails from "../adminprofilesdetails/Userprofilesdetails";

const Navigators = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const PrivateRoute = ({ element, ...props }) => {
    return loggedIn ? element : <Navigate to="/Loginpage" />;
  };
  
  
  
  return (
    <BrowserRouter>

      <Routes>
     
        <Route path="/" element={<Homepage />} />
        <Route path="/Loginpage" element={<Loginpage   setLoggedIn={setLoggedIn}   />} />
        <Route path="/Signuppage" element={<Signuppage />} />
     
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
        <Route path="/Adminpage" element={<Adminpage />} />
  
        <Route path="*" element={<Errorscreen />} />
   
  
               {/* Private routes */}

     
      <Route
      path="/Allprofile"
      element={<PrivateRoute element={<Allprofile />} />}
    />
      <Route
      path="/Admindashboard"
      element={<PrivateRoute element={<Admindashboard />} />}
    />
    <Route
    path="/Datasubmitform"
    element={<PrivateRoute element={<Datasubmitform />} />}
  />
  <Route
  path="/Userprofile"
  element={<PrivateRoute element={<Userprofile />} />}
/>
<Route
  path="/Mydetail"
  element={<PrivateRoute element={<Mydetail />} />}
/>
<Route
path="/Userdetail"
element={<PrivateRoute element={<Userdetail />} />}
/>
<Route
path="/Userprofilesdetails"
element={<PrivateRoute element={<Userprofilesdetails />} />}
/>
      </Routes>
    </BrowserRouter>
  );
};
export default Navigators;
