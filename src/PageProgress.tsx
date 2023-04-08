import { Grid, Container, CircularProgress } from "@mui/material";

export const PageProgress = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
        <CircularProgress />
      </Grid>
    </Container>
  );
};
