import React from "react";
import plyaStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={plyaStore} alt="playstore_image" />
        <img src={appStore} alt="appstore_image" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High quality is our high priority</p>

        <p>Copyrights 2023 &copy; MeParthNandani</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <span>Instagram</span>
        <span>Youtube</span>
        <span>Facebook</span>
      </div>
    </footer>
  );
};

export default Footer;
