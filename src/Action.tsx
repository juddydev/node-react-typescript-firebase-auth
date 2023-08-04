import { verifyPasswordResetCode, confirmPasswordReset } from "@firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { LockReset } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button } from "@mui/material";
import { Container, Box } from "@mui/system";

import { auth } from "./firebase";

export const Action = () => {
  const [mode, setMode] = useState<string>("");
  const [oobCode, setOobCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get("mode") || "";
    const oobCodeParam = params.get("oobCode") || "";
    setMode(modeParam);
    setOobCode(oobCodeParam);

    if (!isValidMode(modeParam)) {
      alert("Invalid URL.");
      navigate("/");
    }
  }, []);

  const isValidMode = (mode: string) => {
    return mode === "resetPassword";
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await verifyPasswordResetCode(auth, oobCode);
    } catch (error) {
      console.error(error);
      alert("Password reset failed.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
    } catch (error) {
      console.error(error);
      alert("Password reset failed.");
      return;
    }

    alert("Password reset succeeded.");
    navigate("/");
  };

  return (
    <>
      {mode === "resetPassword" ? (
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangePassword(event);
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Reset your password
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};
