import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const TopRightMenu = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleUser = () => {
    user ? navigate("/logged") : navigate("/");
  };
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <IconButton color="default">
        <Badge color="default" overlap="rectangular">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton color="default" onClick={handleUser}>
        <AccountCircleIcon />
      </IconButton>
    </Grid>
  );
};

export default TopRightMenu;
