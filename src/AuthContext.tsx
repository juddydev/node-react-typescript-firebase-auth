import { User } from "firebase/auth";
import { createContext, ReactNode, useState, useEffect } from "react";

import { auth } from "./firebase";

type CurrentUser = User | null | undefined;

export const AuthContext = createContext<CurrentUser>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
