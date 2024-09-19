/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import Logo from '../img/Logo.png'
import TwitterIcon from '../img/twitter-sign.png'
import BehanceIcon from '../img/behance.png'
import InstaIcon from '../img/instagram.png'
import DribbbleIcon from '../img/dribbble-logo.png'

// Styled components for the follow-us section
const FollowUs = styled.div`
  /* border: 2px solid red; */
  position: relative;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  background-color: #ccc;
  height: 40vh;
  /* padding: 40px; */
  align-items: flex-start;
`;

const FollowTitle = styled.h2`
  font-size: 40px;
  color: rgba(11, 11, 51, 0.5);
`;

const SocialMediaText = styled.div`
  position: relative;

  top: 40%;
  color: rgba(0, 0, 1, 0.8);

`;

const SocialMedia = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin-right: 10px;
  top: 60%;
  left: 10%;
  /* border: 2px solid red; */
  filter: contrast(20%);
  transition: 1s;

  &:hover {
    filter: contrast(100%);
  }
`;

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: contrast(20%);
  transition: 1s;

  &:hover {
    filter: contrast(100%);
  }
`;

// Styled components for the footer-address section
const FooterAddress = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
  height: 80vh;
  background-color: rgb(0, 61, 77);

`;


const FooterCol1 = styled.div`
  width: 30vw;
`;


const FooterCol2 = styled.div`
  margin-top: 150px;
  width: 20vw;
  padding: 2rem;
  padding-left: 5rem;
`;



const FooterTitle = styled.h2`
  color: #fff;
  font-size: 40px;
`;

const FooterSubtitle = styled.h3`
  color: #fff;
  font-size: 25px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 10%;
  margin-bottom: 20px;
  outline: none;
  padding-left: 30px;
`;

const Button = styled.button`
  background-color: rgb(26, 26, 34);
  outline: none;
  color: #fff;
  cursor: pointer;
`;

const FooterLogo = styled.img`
  position: relative;
  width: 160px;
  height: 170px;
  margin: 50px;
  padding: 0%;
  justify-content: center;
  /* margin-left: 100px; */
  background-color: #fff;
  padding-left: 20px;
  padding-top: 10px;
  border-radius: 100%;
`;

const FooterLogoLink = styled.a `
   color: aliceblue;
   text-decoration: none;
`

const CopyRight = styled.div`
  padding-top: 20px;
  padding: 25px auto;
  text-align: center;
  height: 10vh;
  color: #fff;
  background-color: rgb(26, 26, 34);
`;


// Footer component
function Footer() {
  return (
    <div>
      <FollowUs>
        <FollowTitle>Follow Us on </FollowTitle>
        <SocialMediaText>
          <h3>Follow Addis MusiQa On Social Medias</h3>
        </SocialMediaText>
        <SocialMedia>
          <a href="">
            <SocialIcon src={TwitterIcon} alt="Twitter" />
          </a>
        </SocialMedia>

        <SocialMedia>
          <a href="">
            <SocialIcon src={BehanceIcon} alt="Behance" />
          </a>
        </SocialMedia>
        <SocialMedia>
          <a href="">
            <SocialIcon src={InstaIcon} alt="Instagram" />
          </a>
        </SocialMedia>
        <SocialMedia>
          <a href="">
            <SocialIcon src={DribbbleIcon} alt="Dribbble" />
          </a>
        </SocialMedia>
      </FollowUs>

      <FooterAddress>

        <FooterCol1>
          {/* <div className="footer-logo"> */}
            <FooterLogo src={Logo} alt="" />
          {/* </div> */}
          <h3><FooterLogoLink href="">Tel +251909091***</FooterLogoLink></h3>
          <h3><FooterLogoLink href="">Mail To : Addismusiqamusichub@gmail.com</FooterLogoLink></h3>
          <h3><FooterLogoLink href="">Site: Addis MusiQa music hub</FooterLogoLink></h3>
          <h3><FooterLogoLink href="" target="_blank">GitHub: Melkamu Mesene</FooterLogoLink></h3>
        </FooterCol1>

        <FooterCol2>
          <FooterTitle>Sitemap</FooterTitle>
          <FooterSubtitle>Site Pages</FooterSubtitle>
          <ul>
            <li><FooterLogoLink href="/">Home</FooterLogoLink></li>
            <li><FooterLogoLink href="/playlist">Playlist</FooterLogoLink></li>
            <li><FooterLogoLink href="/addSongs">Add songs</FooterLogoLink></li>
          </ul>
        </FooterCol2>

      </FooterAddress>

      <CopyRight>
        <p>Copyright &copy; All rights reserved by Addis MusiQa, Developer of Malik Website.</p>
      </CopyRight>
    </div>
  );
}

export default Footer;
