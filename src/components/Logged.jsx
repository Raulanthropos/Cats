import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, resetFavorites } from "../redux/actions/CatAction";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { welcomeCat } from "../redux/actions/CatAction.js";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationModal from "./ConfirmationModal";

const useStyles = styled((theme) => ({
  avatar: {
    width: theme.spacing(80),
    height: theme.spacing(80),
  },
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
}));

function Logged() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const catImageUrl = useSelector((state) => state.cats.catImageUrl);
  const lists = useSelector((state) => state.cats?.lists);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [buttonText, setButtonText] = useState("Logout");

  useEffect(() => {
    dispatch(welcomeCat());
    setTimeout(() => {
      console.log("This is the created lists", lists);
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCloseLogoutConfirmation = () => {
    // setTimeout(() => {
    setShowLogoutConfirmation(false);
    // }, 3000);
  };

  const handleConfirmLogout = () => {
    setIsLoading(true);
    dispatch(resetFavorites());
    dispatch(logoutUser(user));
    navigate("/");
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", position: "relative" }}
        spacing={8}
      >
        <>
          <Grid item m={12} l={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h3">
                You are logged in, as{" "}
                {user?.email?.split("@")[0].charAt(0).toUpperCase() +
                  user?.email?.split("@")[0].slice(1)}
                !
              </Typography>
            </Grid>
            <Grid container justifyContent="center" alignItems="center"></Grid>
          </Grid>
          <Grid item m={12} l={6}>
            <Avatar
              variant="square"
              alt="example"
              src={catImageUrl}
              style={{
                width: "70vw",
                height: "70vw",
                maxWidth: "700px",
                maxHeight: "700px",
                marginTop: "30px",
              }}
              className={classes.avatar}
            />
          </Grid>

          <ConfirmationModal
            open={showLogoutConfirmation}
            handleClose={handleCloseLogoutConfirmation}
            confirmRemove={handleConfirmLogout}
            catToRemove={null}
            isLoading={isLoading}
            buttonText="Logout"
            titleText="Are you sure you want to logout?"
          />
        </>
      </Grid>
    </>
  );
}

export default Logged;
