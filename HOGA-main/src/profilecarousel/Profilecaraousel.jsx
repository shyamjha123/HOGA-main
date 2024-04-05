import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Profilecaraousel(){
  
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
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
    const datastorage = [
        {
          image: "https://sundarjodi.com/img/5marathi-couple.png",
          profile: {
            name: "JPragati & Rahul",
            occupation:
              "Perfect for what i needed. Found my Lenders almost instantly. who use again. Perfect for what i needed. Found my Lenders almost instantly. who use again.",
            // location: "New York",
          },
        },
        {
          image: "https://sundarjodi.com/img/4marathi-couple.png",
          profile: {
            name: "Ankita & Rajesh",
            occupation:
              "Perfect for what i needed. Found my Lenders almost instantly. who use again. Perfect for what i needed. Found my Lenders almost instantly. who use again.",
            // location: "Los Angeles",
          },
        },
        {
          image: "https://sundarjodi.com/img/3marathi-couple.png",
          profile: {
            name: "Jane Smith",
            occupation:
              "Perfect for what i needed. Found my Lenders almost instantly. who use again. Perfect for what i needed. Found my Lenders almost instantly. who use again.",
            // location: "Los Angeles",
          },
        },
        {
          image: "https://sundarjodi.com/img/2marathi-couple.png",
          profile: {
            name: "Rupesh & Priyanka",
            occupation:
              "Perfect for what i needed. Found my Lenders almost instantly. who use again. Perfect for what i needed. Found my Lenders almost instantly. who use again.",
            // location: "Los Angeles",
          },
        },
        // Add more data as needed
      ];

  return (
    <>
    <Carousel
    swipeable={true}
    draggable={true}
    showDots={false}
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
    responsive={responsive}
  >
    {datastorage.map((item, index) => (
      <div
        style={{
          display: "flex",
          width: "70%",
          backgroundColor:"#fff",
          boxShadow:"0 4px 8px rgba(0, 0,  0, 0.5)",
          borderColor:"gray",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "20px",
          // marginLeft:"20px"
          // paddingLeft:"20px"
        }}
        key={index}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height:"320px",
            borderRadius: "20px"
            // height: "30%",
          }}
        >
          <img
            style={{ width: "100%", height:"100%",borderRadius:"10px", height: "80%" }}
            src={item.image}
            alt={`Image ${index}`}
          />
        </div>
      
        <div
          style={{
            display: "flex",
            width: "90%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <h3>{item.profile.name}</h3>
          <p>{item.profile.occupation}</p>
        </div>
      </div>
    ))}
  </Carousel>
    </>
  )
}

export default Profilecaraousel
