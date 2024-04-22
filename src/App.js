import "devextreme/dist/css/dx.light.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/AdminFr";
import { Homepage, LogIn, Reset, Register } from "./pages";
import { UserContext } from "./hooks";

function App() {
  const [username, setUsername] = useState(localStorage["username"] || "");
  useEffect(() => {
    localStorage["username"] = username;
  }, [username]);

  const [userId, setUserId] = useState(localStorage["userId"] || "");
  useEffect(() => {
    localStorage["userId"] = userId;
  }, [userId]);

  const [user, setUser] = useState(localStorage["user"] || "");
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);
  const [emailToSend, setEmailToSend] = useState("");
  const [announce, setAnnounce] = useState("");
  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        user,
        setUser,
        emailToSend,
        setEmailToSend,
        announce,
        setAnnounce,
      }}
    >
      <Routes>
        <Route exact path="/logIn" element={<LogIn />} />
        {username && username.length > 0 && (
          <Route exact path="/home" element={<Homepage />} />
        )}
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<Admin />} />{" "}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
