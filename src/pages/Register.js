import React from "react";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [action, setAction] = React.useState("Sign In");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [id, setId] = React.useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("buttonClicked");
    try {
      fetch("http://localhost:3002/users", {
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
      }).then((res) => {
        console.log(res);
        if (res.status == 400) {
          alert("Creating Account Failed. Try Again");
        } else {
          navigate("/home");
        }
      });
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

export default Register;
