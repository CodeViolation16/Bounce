import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { UserContext } from "../hooks";

function Header() {
  const [announcement, setAnnouncement] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/users/get")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncement(data[0].content);
       console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <StyledDiv style={{ backgroundColor: "black" }}>
      <Marquee speed={30}>
        <div className="announcement">
          <div className="announcement-text text1">
            <span>Annoucement:{announcement}</span>
          </div>
        </div>
      </Marquee>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .announcement {
    background: #000;
    color: white;
    height: 40px;
    display: flex;
    align-items: center;
  }
`;

export default Header;
