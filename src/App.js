import React from "react";
import TaskList from "./components/TaskList";
import { Grid, Box, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: 2,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          maxWidth: "900px",
          backgroundColor: "#a3b18a",
          borderRadius: "20px",
          padding: 3,
          boxShadow: 3,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#3a5a40" }}
          >
            Task Management App
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TaskList />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
