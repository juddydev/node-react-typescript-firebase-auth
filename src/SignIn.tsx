import { signInWithEmailAndPassword } from "@firebase/auth";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { Login } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { Container, Box } from "@mui/system";

import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";
import { PageProgress } from "./PageProgress";

export const SignIn = () => {
  const currentUser = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    if (currentUser === null) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      return;
    }

    navigate("/");
  };

  return (
    <>
      {isLoading ? (
        <PageProgress />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <Login />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeEmail(event);
                }}
              />
              <TextField
                sx={{ mt: 3 }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangePassword(event);
                }}
              />
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="/password-reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Sign In
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
