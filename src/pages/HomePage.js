import React, { useState, useEffect } from "react";
import "./Homepage.css"; // Import your component-specific CSS file
import userContext from "../hooks/userContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [days, setDays] = useState();
  const [selecteDay, setSelecteDay] = useState(2);
  const { username, userId, user, setUsername } = useContext(userContext);
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
    console.log(user);
    if (user === "admin") {
      setAdmin(true);
    }

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
    console.log(next7Days);
  }, []);

  useEffect(() => {
    const tempCourtBooked = {};
    fetch("http://localhost:3002/users/booked")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

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
  }

  return (
    <body>
      <ToastContainer />

      <div className="center">
        <div onClick={() => logOut()}>Log Out</div>
        <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
          {" "}
          Welcome {username}
        </h1>

        <div className="tickets">
          <div className="ticket-selector">
            <div className="head">
              <div className="title">Tennis Court Booking</div>
            </div>
            <div className="status">
              <div className="item">Available</div>
              <div className="item">Booked</div>
              <div className="item">Selected</div>
            </div>
            <div className="seats">
              {courtButtons.map((child) => (
                <button
                  className="courtButtons"
                  onClick={() => {
                    setOpen(true);
                    setCourtConfirmation(child);
                    console.log(courtConfirmation);
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

export default Homepage;
