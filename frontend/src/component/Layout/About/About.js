import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="/Profile.png"
              alt="Founder"
            />
            <Typography>Parth Nandani</Typography>
            <Button color="primary">Visit Instagram</Button>
            <span>
              This is a sample wesbite made by @meabhisingh. Only with the
              purpose to teach MERN Stack on the channel 6 Pack Programmer
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <span>
              <YouTubeIcon className="youtubeSvgIcon" />
            </span>

            <span>
              <InstagramIcon className="instagramSvgIcon" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
