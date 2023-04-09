import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { CssBaseline, Typography, Button, Box } from "@mui/material";
import { Container } from "@mui/system";

import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";
import { PageProgress } from "./PageProgress";

export const Home = () => {
  const currentUser = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/signin");
    }
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const signOut = () => {
    auth.signOut();
    navigate("/signin");
  };

  return (
    <>
      {isLoading ? (
        <PageProgress />
      ) : (
        <Container component="main" maxWidth={false}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold">
              Firebase Authentication Sandbox on Web
            </Typography>
            <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
              Welcome, {currentUser?.email}
            </Typography>
            <Box component="div" sx={{ mt: 5 }}>
              <Button href="/signup" fullWidth variant="contained">
                Sign Up
              </Button>
              <Button onClick={signOut} fullWidth variant="contained" sx={{ mt: 3 }}>
                Sign Out
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
