import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  card: {
    flexGrow: 1,
    maxWidth: 300,
    // maxHeight: 500,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardContentStyle: {
    height: "250px !important",
  },
  descriptionAsIf: {
    maxHeight: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    whiteSpace: "normal",
    lineClamp: 3,
    position: "relative",
  },
  readMore: {
    position: "absolute",
    right: 0,
    bottom: 0,
    background: "white",
    padding: "0 5px",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  listText: {
    textAlign: "center !important",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  createButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  listHeader: {
    textAlign: "center",
    marginBottom: "20px !important",
    color: "white !important",
  },
}));

export default function CardComponent({
  buttonTextBl = "",
  buttonTextRd = "",
  handleDelete = () => {},
  handleOpen = () => {},
  titleText = "",
  descriptionText = "",
  catImg = "",
}) {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(false);

  const maxCollapsedHeight = 100; // Set the maximum height for the description in its collapsed state

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const shouldShowExpandLink = descriptionText.length > maxCollapsedHeight;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          catImg
            ? catImg
            : "https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        }
        title={titleText}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" component="h6" clasName={classes.listText}>
          {titleText}
        </Typography>
        <Typography
          className={clsx(classes.descriptionText, {
            [classes.expanded]: isExpanded,
          })}
          style={{
            maxHeight: isExpanded ? "100%" : `${maxCollapsedHeight}px`,
          }}
        >
          {descriptionText}
        </Typography>
        {shouldShowExpandLink && (
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Read less..." : "Read more..."}
          </Button>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          {buttonTextBl}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={handleDelete}
        >
          {buttonTextRd}
        </Button>
      </CardActions>
    </Card>
  );
}

CardComponent.propTypes = {
  buttonTextBl: PropTypes.string,
  buttonTextRd: PropTypes.string,
  titleText: PropTypes.string,
  descriptionText: PropTypes.string,
  catImg: PropTypes.string,
  handleDelete: PropTypes.func,
  handleOpen: PropTypes.func,
};
