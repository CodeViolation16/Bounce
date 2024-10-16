import React, { useState, useEffect, useContext } from "react";
import "./Homepage.css"; // Import your component-specific CSS file
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import { Modal } from "../../components";
import { UserContext } from "../../hooks";

export const Homepage = () => {
  const [days, setDays] = useState();
  const [selecteDay, setSelecteDay] = useState(2);
  const { username, userId, user, setUsername } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [courtConfirmation, setCourtConfirmation] = useState();
  const [times, setTimes] = useState(new Set());
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const [courtBooked, setCourtBooked] = useState({});
  const courtButtons = [
    "Court 1",
    "Court 2",
    "Court 3",
    "Court 4",
    "Court 5",
    "Court 6",
    "Court 7",
    "Court 8",
    "Court 9",
    "Court 10",
  ];

  useEffect(() => {
    // console.log(user);
    const currentDate = new Date();

    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      const dayOfMonth = nextDate.getDate();

      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][
        nextDate.getDay()
      ];

      next7Days.push({
        dayOfMonth: dayOfMonth,
        dayName: dayName,
      });
    }

    setDays(next7Days);
  }, []);

  useEffect(() => {
    // console.log(user);
    const tempCourtBooked = {};
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/booked`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        data.map((item) => {
          const court = item.courtBooked,
            day = item.dayBooked;
          const id = court + " -> " + day;
          if (!tempCourtBooked[id]) {
            tempCourtBooked[id] = new Map();
          }
          tempCourtBooked[id].set(item.timeBooked, item);
        });
        setCourtBooked(tempCourtBooked);
      });
  }, []);

  function logOut() {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
  function profileSetting() {
    return;
    <div className="profile_container">
      <div>
        <input placeholder="Change Name" />
        <input placeholder="Change Email" />
      </div>
    </div>;
  }

  function Admin() {
    navigate("/admin");
  }
  return (
    <body>
      <ToastContainer />
      <div>
        {" "}
        <Header />{" "}
      </div>
      <div className="header">
        <div>Welcome {username}</div>
        {/* <div>Profile Setting</div> */}
        {/* {user == "admin" && <div onClick={() => Admin()}>Admin Features</div>} */}
        {/* <div styled={{ marginRight: "50px" }} onClick={() => profileSetting()}>
          Profile Setting
        </div>{" "} */}
        <div styled={{ marginRight: "50px" }} onClick={() => logOut()}>
          Log Out
        </div>{" "}
      </div>
      <div className="center">
        <div className="tickets">
          <div className="ticket-selector">
            <div className="head">
              <div className="title">Tennis Court Booking</div>
            </div>
            <div className="status">
              <div className="item">Available</div>
              {/* <div className="item">Booked</div> */}
              <div className="item">Selected</div>
            </div>
            <div className="seats">
              {courtButtons.map((child, idx) => (
                <button
                  className="courtButtons"
                  key={idx}
                  onClick={() => {
                    setOpen(true);
                    setCourtConfirmation(child);
                    // console.log(courtConfirmation);
                  }}
                >
                  {" "}
                  {child}
                </button>
              ))}
            </div>
            <div className="timings">
              <div className="dates">
                {days &&
                  days.map((day, key) => (
                    <>
                      <input
                        key={key}
                        type="radio"
                        name="date"
                        id={"d" + (key + 1)}
                        checked={key === selecteDay ? true : false}
                        onChange={() => setSelecteDay(key)}
                      />
                      <label htmlFor={"d" + (key + 1)} className="dates-item">
                        <p className="day">{day.dayName}</p>
                        <p className="date">{day.dayOfMonth}</p>
                      </label>
                    </>
                  ))}
              </div>
              <div style={{ textAlign: "center", paddingTop: "2em" }}>
                Members Can Only Book 7 Days In Advance{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          days={days}
          selecteDay={selecteDay}
          setTimes={setTimes}
          times={times}
          courtConfirmation={courtConfirmation}
          courtBooked={courtBooked}
          setCourtBooked={setCourtBooked}
        />
      )}
    </body>
  );
};
