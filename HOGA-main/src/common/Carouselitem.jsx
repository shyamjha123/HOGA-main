import { Carousel } from 'react-bootstrap';
import ReactPlayer from "react-player";
import React from 'react';

function Carouselitem() {
    const Video = [
        {
            src:'//player.vimeo.com/video/789459123?title=0&portrait=0&byline=0&autoplay=1&muted=true'
        },
        {
            src:'//player.vimeo.com/video/723838804?title=0&portrait=0&byline=0&autoplay=1&muted=true'
        },
        {
            src:'//player.vimeo.com/video/789459122?title=0&portrait=0&byline=0&autoplay=1&muted=true'
        }
    ];

    return (
        <div style={{marginTop:"50px"}} >
            <Carousel>
                {Video.map((video, index) => (
                    <Carousel.Item key={index}>
                        <ReactPlayer
                            url={video.src}
                            width='100%'
                            pip={true}
                            controls={true}
                            playing={true}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Carouselitem;
