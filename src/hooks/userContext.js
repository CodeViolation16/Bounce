import { createContext } from "react";

const userContext = createContext({
  username: "",
  setUsername: () => {},
  userId: "",
  setUserId: () => {},
  user: {},
  setUser: () => {},
});

export default userContext;
