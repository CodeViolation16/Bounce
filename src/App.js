import { useEffect, useState } from "react";
import userContext from "./hooks/userContext";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Reset from "./pages/Reset";
import AdminModal from "./components/adminModal";
import DataTable from "./components/adminModal copy";

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
    <userContext.Provider
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
    </userContext.Provider>
  );
}

export default App;
