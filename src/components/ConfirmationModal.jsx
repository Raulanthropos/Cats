import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  spanster: {
    background: "red",
    color: "white",
    fontSize: "16px !important",
    minWidth: "140px !important",
  },
  sadAvatar: {
    width: "120px !important",
    height: "120px !important",
  },
  dialogContentCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  pleadingCat: {
    fontWeight: "bold",
  },
}));
export default function ConfirmationModal({
  open = false,
  handleClose = () => {},
  confirmRemove = () => {},
  catToRemove = null,
  buttonText = "",
  titleText = "",
  isLoading = false,
}) {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent className={classes.dialogContentCenter}>
        {catToRemove && (
          <>
            <img src={catToRemove?.url} className={classes.sadAvatar} />
            <Typography mt={2} display="block">
              <Typography component="span" className={classes.pleadingCat}>
                Purrrrlease
              </Typography>{" "}
              don't!
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={confirmRemove}
          color="error"
          variant="contained"
          className={classes.spanster}
        >
          {isLoading ? <CircularProgress size={24} /> : buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  confirmRemove: PropTypes.func,
  catToRemove: PropTypes.object,
  titleText: PropTypes.string,
  buttonText: PropTypes.string,
  isLoading: PropTypes.bool,
};
