import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [resetInput, setResetInput] = React.useState(false);
  const [passcode, setPasscode] = useState();
  const [randomPassword, setRandomPassword] = useState(
    Math.floor(Math.random() * 90000) + 10000
  );
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [newPassword, setNewPassword] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");

  useEffect(() => {
    console.log(randomPassword);
    localStorage["randomPassword"] = randomPassword;
  }, [randomPassword]);

  async function emailConfirmation() {
    var templateParams = {
      to_email: email,
      from_name: "Tennis Court Booking App",
      message: `This is your secret code: ${randomPassword}`,
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setResetInput(true);
        emailConfirmation();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function validation(event) {
    event.preventDefault();
    console.log(passcode, randomPassword);
    if (Number(passcode) === randomPassword) {
      setNewPassword(true);
    }
  }
  async function updatePassword(event) {
    event.preventDefault();
    console.log("Reached here");
    if (updatedPassword !== confirmNewPassword) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/reset/new`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: updatedPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="login-container">
      <form id="login-form">
        <h1>Find Your Account</h1>
        <label>
          <div>Please Enter Your Email</div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
        </label>
        {resetInput ? (
          <label>
            <div>Check Your Email For The Code</div>
            <input
              type="text"
              name="text"
              value={passcode}
              placeholder="Secret Code"
              onChange={(e) => setPasscode(e.target.value)}
              className=""
            />
          </label>
        ) : null}
        {newPassword ? (
          <>
            <label>
              <div>Set New Password</div>
              <input
                type="password"
                name="text"
                value={updatedPassword}
                placeholder="New Password"
                onChange={(e) => setUpdatedPassword(e.target.value)}
                className=""
              />
            </label>
            <label>
              <div>Confirm New Password</div>
              <input
                type="password"
                name="text"
                value={confirmNewPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className=""
              />
            </label>
          </>
        ) : null}
        <div id="button-container">
          <button
            type="submit"
            className="button create"
            onClick={
              newPassword
                ? updatePassword
                : !resetInput
                ? handleSubmit
                : validation
            }
          >
            {newPassword ? "Update Password" : !resetInput ? "Search" : "Send"}
          </button>{" "}
          <Link to="/login">
            {" "}
            <button className="button login">Cancel</button>
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
