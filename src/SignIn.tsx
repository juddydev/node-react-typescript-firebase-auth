import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { Login, Google } from "@mui/icons-material";
import { CssBaseline, Avatar, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { Container, Box } from "@mui/system";

import { AuthContext } from "./AuthContext";
import { auth, googleAuthProvider } from "./firebase";
import { PageProgress } from "./PageProgress";

const formSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

export const SignIn = () => {
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
      password: "",
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
      await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in.");
      return;
    }

    navigate("/");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
      alert("Failed to sign in.");
    }
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
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
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
              <TextField
                sx={{ mt: 3 }}
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="/password-reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Sign in
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Grid item sx={{ mt: 2 }}>
                  <Button variant="outlined" startIcon={<Google />} onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
