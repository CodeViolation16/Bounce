import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, LogIn, Reset, Register } from "./pages";
import { UserContext } from "./hooks";
import { AdminModal, DataTable } from "./components";

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

  return (
    <UserContext.Provider
      value={{ username, setUsername, userId, setUserId, user, setUser }}
    >
      <Routes>
        <Route exact path="/logIn" element={<LogIn />} />
        {username && username.length > 0 && (
          <Route exact path="/home" element={<HomePage />} />
        )}
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<AdminModal />} />{" "}
        <Route exact path="/admintest" element={<DataTable />} />{" "}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
