import { sendPasswordResetEmail } from "@firebase/auth";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { LockReset } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button } from "@mui/material";
import { Container, Box } from "@mui/system";

import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";
import { PageProgress } from "./PageProgress";

export const PasswordReset = () => {
  const currentUser = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
      alert("Failed to send password reset email.");
      return;
    }

    alert("Password reset email sent successfully.");
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
              <LockReset />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Send password reset email
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
