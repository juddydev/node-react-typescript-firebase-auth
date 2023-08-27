import { sendPasswordResetEmail } from "@firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { LockReset } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button } from "@mui/material";
import { Container, Box } from "@mui/system";

import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";
import { PageProgress } from "./PageProgress";

const formSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const PasswordReset = () => {
  const currentUser = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    if (currentUser === null) {
      setIsLoading(false);
    }
  }, [currentUser]);

  const onSubmit = async (formValues: FormSchema) => {
    try {
      await sendPasswordResetEmail(auth, formValues.email);
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
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
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
