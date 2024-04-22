import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { UserContext } from "../hooks";

function Header() {
  const { announce } = useContext(UserContext);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(announce);
  }, [announce]);

  console.log(announcement);

  return (
    <StyledDiv style={{ backgroundColor: "black" }}>
      <Marquee speed={30}>
        <div className="announcement">
          {/* <marquee
            behavior="scroll"
            direction="left"
            scrollamount="60"
            onMouseOver={() => this.stop()}
            onMouseOut={() => this.start()}
          > */}
          <div className="announcement-text text1">
            <span>
              Annoucement: Court 4 will be under maintainence on this Wednesday
              {announcement}
            </span>
          </div>

          {/* </marquee> */}
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
