import { createContext } from "react";

export const UserContext = createContext({
  username: "",
  setUsername: () => { },
  userId: "",
  setUserId: () => { },
  user: {},
  setUser: () => { },
});

