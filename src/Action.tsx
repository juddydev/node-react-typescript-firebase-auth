import { verifyPasswordResetCode, confirmPasswordReset } from "@firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { LockReset } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button } from "@mui/material";
import { Container, Box } from "@mui/system";

import { auth } from "./firebase";

const formSchema = z.object({
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const Action = () => {
  const [mode, setMode] = useState<string>("");
  const [oobCode, setOobCode] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
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

  const onSubmit = async (formValues: FormSchema) => {
    try {
      await verifyPasswordResetCode(auth, oobCode);
    } catch (error) {
      console.error(error);
      alert("Password reset failed.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, formValues.password);
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
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
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
