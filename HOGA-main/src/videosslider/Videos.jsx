import React from 'react';

function Videos() {
// https://www.youtu.be/OYQzr1VV5Eg?si=Gz54pudMGaO2-Ag0
//https://youtube.com/shorts/BsfumoBoXuQ?si=GQlIardQyTQE4pxx
  // https://www.youtube.com/watch?v=JNKZN8uq1H8
  //https://www.youtube.com/watch?v=tyBJioe8gOs


  // https://youtu.be/tyBJioe8gOs?si=9FAfwTdCbpazyhc6

  // https://www.youtube.com/watch?v=tyBJioe8gOs

  // https://www.youtube.com/watch?v=OYQzr1VV5Eg
  return (
    <div className="video-container">
    <div className="video-wrapper">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/tyBJioe8gOs?rel=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="video-wrapper">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/Bs-pBFSkqe8?rel=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="video-wrapper">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/OYQzr1VV5Eg?rel=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
  )
}

export default Videos
