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
function ConfirmationCancel({
  setCancelTime,
  cancelTime,
  timeIntervals,
  setCourtBooked,
  days,
  selecteDay,
  courtConfirmation,
  courtBooked,
}) {
  const { userId, username } = useContext(userContext);
  function emailConfirmation() {
    var templateParams = {
      to_name: username,
      from_name: "Tennis Court Booking App",
      message: `You Canceled ${timeIntervals[cancelTime]} on
       ${days[selecteDay]?.dayOfMonth}${" "}
        ${days && days[selecteDay]?.dayName}`,
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        courtBooked[
          courtConfirmation + " -> " + days[selecteDay].dayOfMonth
        ]?.get(cancelTime)
      ),
    })
      .then(() => {
        setCancelTime();
        setCourtBooked((prev) => {
          const temp = { ...prev };
          delete temp[courtConfirmation + " -> " + days[selecteDay].dayOfMonth];
          return temp;
        });
        toast("Cancel Successfully");
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
        Are you sure you want to cancel your appoinment @{" "}
        {timeIntervals[cancelTime]} on {days[selecteDay]?.dayOfMonth}{" "}
        {days && days[selecteDay]?.dayName}
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
      <button className="cancel" onClick={() => setCancelTime()}>
        Cancel
      </button>
    </Div>
  );
}

export default ConfirmationCancel;
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
