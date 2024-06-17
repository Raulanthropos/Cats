import { React } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  logoutUser,
  resetFavorites,
  dashboardOpen,
} from "../redux/actions/CatAction";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import TopRightMenu from "./TopRightMenu";
import ConfirmationModal from "./ConfirmationModal";
import { useTranslation } from "react-i18next";

const useStyles = styled((theme) => ({
  avatar: {
    width: "250px !important",
    height: "250px !important",
    // marginRight: theme.spacing(1),
  },
  smavatar: {
    width: "50 !important",
    height: "50 !important",
  },
  menuItems: {
    textAlign: "center !important",
    fontWeight: "900 !important",
  },
  menuItemOutline: {
    textAlign: "center !important",
    // borderRadius: "10% !important",
    border: "1px solid black !important",
  },
  menuItemContainedLg: {
    textAlign: "center !important",
    // borderRadius: "10% !important",
    background: "red !important",
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  menuItemContainedCs: {
    textAlign: "center !important",
    // borderRadius: "10% !important",
    background: "blue !important",
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  menuItemContainedDb: {
    textAlign: "center !important",
    // borderRadius: "10% !important",
    background: "green !important",
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  pleaseLogin: {
    textAlign: "center !important",
    fontWeight: "900 !important",
    fontSize: "20px !important",
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogoutConf = () => {
    setShowLogoutConfirmation(true);
    setIsLoading(false);
  };

  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);
  const dashboardStatus = useSelector((state) => state.user.dashboardOpen);
  const userName =
    user?.email?.split("@")[0].charAt(0).toUpperCase() +
    user?.email?.split("@")[0].slice(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleUser = () => {
    user ? navigate("/logged") : navigate("/");
  };

  const handleCloseLogoutConfirmation = () => {
    // setTimeout(() => {
    setShowLogoutConfirmation(false);
    // }, 3000);
  };

  const handleConfirmLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(resetFavorites());
      dispatch(logoutUser(user));
      dispatch(dashboardOpen(false));
      navigate("/");
      setShowLogoutConfirmation(false);
    }, 3000);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [open, setOpen] = useState(dashboardStatus);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "16px",
        }}
      >
        <Button onClick={() => handleLanguageChange("en")} color="inherit">
          English
        </Button>
        <Button onClick={() => handleLanguageChange("es")} color="inherit">
          Español
        </Button>
      </div>
      {user ? (
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid
              container
              item
              xs={12}
              lg={6}
              justifyContent="left"
              alignItems="center"
            >
              <Grid
                item
                xs={3}
                lg={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h6">
                  {userName.length > 5
                    ? `${userName.slice(0, 5)}... `
                    : userName}
                </Typography>
                <Avatar
                  src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  className={classes.smavatar}
                />
              </Grid>
              <Grid item xs={3} lg={2}>
                <IconButton onClick={() => setOpen(true)} edge="start">
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              justifyContent="flex-end"
              alignItems="center"
            >
              <TopRightMenu />
            </Grid>
          </Grid>
        </Toolbar>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h1">{t("welcome")}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{t("greeting")}</Typography>
          </Grid>
        </Grid>
      )}

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem button onClick={() => console.log("Home")}>
            <Avatar
              src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              className={classes.avatar}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h4" align="center" fontWeight="bold">
                  {user ? userName : ""}
                </Typography>
              }
            />
          </ListItem>
          <ListItem button onClick={handleUser}>
            <ListItemText
              primary={user ? t(`loggedscreen`) : t("loggedout")}
              className={classes.menuItems}
              style={user ? { color: "red" } : { fontWeight: "bolder" }}
            />
          </ListItem>
          <ListItem
            button
            onClick={handleLogoutConf}
            disabled={user ? false : true}
          >
            <ListItemText
              primary={user ? t("logout") : "❌"}
              className={
                user ? classes.menuItemContainedLg : classes.pleaseLogin
              }
            />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/cats")}
            disabled={user ? false : true}
          >
            <ListItemText
              primary={t("cats")}
              className={user ? classes.menuItemContainedCs : classes.menuItems}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/favourites")}
            disabled={user ? false : true}
          >
            <ListItemText
              primary={t("favorites")}
              className={user ? classes.menuItemContainedCs : classes.menuItems}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/dashboard")}
            disabled={user ? false : true}
          >
            <ListItemText
              primary={t("dashboard")}
              className={user ? classes.menuItemContainedDb : classes.menuItems}
            />
          </ListItem>
          {/* <ListItem
            button
            onClick={() => navigate("/lists")}
            disabled={user ? false : true}
          >
            <ListItemText
              primary={t("lists")}
              className={user ? classes.menuItemContainedDb : classes.menuItems}
            />
          </ListItem> */}
        </List>
      </Drawer>
      <ConfirmationModal
        open={showLogoutConfirmation}
        handleClose={handleCloseLogoutConfirmation}
        confirmRemove={handleConfirmLogout}
        catToRemove={null}
        classes={classes}
        isLoading={isLoading}
        buttonText="Logout"
        titleText="Are you sure you want to logout?"
      />
      {/* </Grid> */}
    </>
  );
};

export default NavBar;
