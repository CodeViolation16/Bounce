import React from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../hooks";

export function LogIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const { setUsername, setUserId, setUser, setEmailToSend } =
    useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setUsername(data.username);
        setUserId(data.id);
        setUser(data.role);
        navigate("/home");
        setEmailToSend(data.email);
      }
      if (!data.success || data.errorCode == 10001) {
        console.log("Login failed:", response.statusText);
        setError(true);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  }

  return (
    <div id="login-container">
      <form id="login-form">
        <h1>Sign In</h1>
        {error && <p style={{ color: "red" }}>Invalid email or password</p>}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "error" : null}
          />
        </label>
        <label>
          Password:
          <input
            className={error ? "error" : null}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div id="button-container">
          <button className="button login" onClick={(e) => handleSubmit(e)}>
            Log In
          </button>

          <Link to="/register">
            {" "}
            <button className="button create">Create an Account</button>{" "}
          </Link>
          <Link to="/reset">
            {" "}
            <button className="button create">Forget Password?</button>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
