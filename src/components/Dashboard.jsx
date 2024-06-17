import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TopRightMenu from "./TopRightMenu";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Avatar from "@mui/material/Avatar";

export default function Dashboard() {
  const getRandomAge = () => {
    return Math.floor(Math.random() * (40 - 18 + 1) + 18);
  };

  const getRandomGender = () => {
    const genders = ["M", "F", "NB"];
    return genders[Math.floor(Math.random() * genders.length)];
  };

  const getRandomHobby = () => {
    const hobbies = ["Scuba Diving", "Sky Jumping", "Walking", "Writing"];
    return hobbies[Math.floor(Math.random() * hobbies.length)];
  };

  const age = getRandomAge();
  const gender = getRandomGender();
  const hobby = getRandomHobby();

  const user = useSelector((state) => state.user.currentUser);
  const userName =
    user?.email?.split("@")[0].charAt(0).toUpperCase() +
    user?.email?.split("@")[0].slice(1);
  const catImageUrl = useSelector((state) => state.cats.catImageUrl);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleUser = () => {
    user ? navigate("/logged") : navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "green",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  DASHBOARD
                </Typography>
                {/* Other content */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 240,
                }}
              >
                <Typography variant="h4">Personal Stats</Typography>
                <Typography>Name: {userName}</Typography>
                <Typography>Age: {age}</Typography>
                <Typography>Gender: {gender}</Typography>
                <Typography>Hobbies: {hobby}</Typography>
              </Paper>
            </Grid>
            {/* Avatar */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Display avatar here */}
                <Typography variant="h6">{userName}</Typography>
                <Avatar src={catImageUrl} sx={{ width: 100, height: 100 }} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
