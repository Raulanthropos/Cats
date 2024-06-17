import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const DescriptionPopup = ({ open, anchorEl, handleClose, description }) => {
  const openPopover = Boolean(anchorEl);
  const displayText = description || "This cat doesn't have a description available.";

  return (
    <Popover
      id={openPopover ? "simple-popover" : undefined}
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2, position: "relative" }}>
        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#fff",
            padding: "5px",
            color: "#000",
            cursor: "pointer",
          }}
        >
          <span style={{ fontWeight: "bold" }}>x</span>
        </IconButton>
        {displayText}
      </Typography>
    </Popover>
  );
};

export default DescriptionPopup;
