import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import userContext from "../hooks/userContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function Confirmation({
  time,
  setConfirmation,
  days,
  selecteDay,
  times,
  timeIntervals,
  courtConfirmation,
  setTimes,
  courtBooked,
}) {
  const { userId, username } = useContext(userContext);

  function emailConfirmation() {
    var templateParams = {
      to_name: username,
      from_name: "Tennis Court Booking App",
      message: `You Booked ${courtConfirmation} ${" "}
        ${[...times]
          .sort((a, b) => a - b)
          .map((time) => timeIntervals[time])
          .join(", ")}${" "}
        on ${days[selecteDay]?.dayOfMonth} ${
        days && days[selecteDay]?.dayName
      }`,
    };

    emailjs.send("service_vbrnvm3", "template_0r0gzde", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (err) {
        console.log("FAILED...", err);
      }
    );
  }

  async function bookCourt() {
    const date = new Date();
    if (!userId || userId === "") {
      toast("Please Log In");
      return;
    }

    fetch("http://localhost:3002/users/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courtBooked: courtConfirmation,
        timeBooked: [...times].map((time) => timeIntervals[time]),

        dayBooked: days[selecteDay].dayOfMonth,

        monthBooked: months[date.getMonth()],
        yearBooked: date.getFullYear(),
        userBooked: userId,
      }),
    })
      .then(() => {
        setConfirmation(false);
        setTimes(new Set());
        setConfirmation(null);
        toast("Booking Successfully Confirmed");
      })
      .catch((err) => {
        console.log(err);
        toast("Booking Failed. Try Again");
      });
  }
  return (
    <Div>
      <h2>Confirmation</h2>
      <p>
        {courtConfirmation} @{" "}
        {[...times]
          .sort((a, b) => a - b)
          .map((time) => timeIntervals[time])
          .join(", ")}{" "}
        on {days[selecteDay]?.dayOfMonth} {days && days[selecteDay]?.dayName}
      </p>
      <button
        className="confirm"
        onClick={() => {
          bookCourt();
          emailConfirmation();
        }}
      >
        Confirm
      </button>
      <button className="cancel" onClick={() => setConfirmation(false)}>
        Cancel
      </button>
    </Div>
  );
}

export default Confirmation;
const Div = styled.div`
  p {
    padding-bottom: 1em;
    font-size: 1.1em;
  }
  button {
    background: rgb(60, 60, 60);
    color: white;
    font-size: 14px;
    padding: 7px 14px;
    border-radius: 2mm;
    outline: none;
    border: none;
    cursor: pointer;
    width: 90px;
    height: 39px;
    margin-right: 1em;
  }
  button.cancel {
    background: rgb(231 55 55);
    color: white;
  }
  button.confirm {
    background-color: rgb(28, 185, 120);
    color: white;
  }
`;
