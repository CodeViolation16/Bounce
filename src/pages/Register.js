import React, { useContext, useState } from "react";
import LogIn from "./";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks";

export function Register() {
  const { setUsername, setUserId, setUser } = useContext(UserContext);

  // form state
  const [action, setAction] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("buttonClicked");
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: email,
          password: password,
          id: id,
        }),
      });

      const res_data = await res.json();
      console.log(res_data);
      if (res.status !== 200) {
        alert("Creating Account Failed. Try Again");
        return;
      } else {
        navigate("/home");
      }
      // setUsername(name);
      // setUserId(id);

      // const response = await fetch(process.env.REACT_APP_SERVER_URL + "/users/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: email,
      //     password: password,
      //   }),
      // });

      // const data = await response.json();
      // setUser(data.role)
      // navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Creating Account Failed. Try Again");
    }
  }

  return (
    <div id="login-container">
      <form id="login-form">
        <h1>Register</h1>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Member ID:
          <input
            type="text"
            name="password"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <h4>
          If you already have an account:<Link to="/login">click here</Link>{" "}
        </h4>

        <div id="button-container">
          <button className="button login" onClick={(e) => handleSubmit(e)}>
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
}
