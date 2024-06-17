import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFromFavourites,
  updateFavoriteNickname,
} from "../redux/actions/CatAction";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MoreVert } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ClearRounded } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { debounce } from "lodash";
import { Tooltip } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import DescriptionPopup from "./Description";

const useStyles = styled((theme) => ({
  spansterClass: {
    color: "red",
    fontSize: "48px !important",
  },
  imagery: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  unfavoriteHrt: {
    marginLeft: "10px",
  },
  displayNickName: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  errorMsg: {
    color: "red !important",
    marginInline: "auto !important",
  },
  searchBar: {
    width: "95% !important",
  },
  catcard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      padding: 0,
    },
  },
}));

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFav = useSelector((state) => state.cats.favourite);
  const user = useSelector((state) => state.user.currentUser);
  const userName =
    user?.email?.split("@")[0].charAt(0).toUpperCase() +
    user?.email?.split("@")[0].slice(1);
  const [nickName, setNickname] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [catToRemove, setCatToRemove] = useState(null);
  const [nickNames, setNickNames] = useState(
    isFav.map(() => ({ nickname: "", assignNicknameAsKey: false }))
  );
  const [isLoading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCatIndex, setSelectedCatIndex] = useState(null);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [filteredCats, setFilteredCats] = useState(isFav);
  const [catsFound, setCatsFound] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isMenuOpen, setMenuOpen] = useState(null);
  const [descriptionPopupOpen, setDescriptionPopupOpen] = useState(false);
  const [descriptionPopupAnchorEl, setDescriptionPopupAnchorEl] =
    useState(null);
  const { catId } = useParams();
  const [currentDescription, setCurrentDescription] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowClearButton(value.length > 0);
    // let searchTimer;
    const searchTimer = debounce(() => {
      const filteredCats = isFav.filter(
        (cat) =>
          cat.nickname?.toLowerCase().includes(value.toLowerCase()) ||
          cat.breeds[0]?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCats(filteredCats);
      setCatsFound(filteredCats.length > 0);
    }, 1500);

    if (value.length >= 4) {
      searchTimer();
    } else {
      searchTimer.cancel();
      setFilteredCats(isFav);
      setCatsFound(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length >= 4) {
      setShowClearButton(false);
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleNickname = (cat, catNickname) => {
    const catIndex = filteredCats.findIndex((favCat) => favCat.id === cat.id);
    if (catIndex !== -1) {
      const updatedCats = [...filteredCats];
      updatedCats[catIndex] = {
        ...updatedCats[catIndex],
        nickname: catNickname,
      };

      // Update the state with the new array
      setFilteredCats(updatedCats);
    }
    dispatch(updateFavoriteNickname(cat, catNickname));
  };

  const handleOpen = (cat) => {
    setCatToRemove(cat);
    setOpen(true);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setCatToRemove(null);
  };

  const handleMenuClose = () => {
    setSubmenuOpenIndex(null);
    setAnchorEl(null);
    setSelectedCatIndex(null);
  };

  const updateLocalState = () => {
    const updatedCats = isFav.filter((cat) => cat?.id !== catToRemove?.id);
    setFilteredCats(updatedCats);
  };

  const confirmRemove = () => {
    if (catToRemove) {
      setLoading(true);
      dispatch(removeFromFavourites(catToRemove));
      handleClose();
      updateLocalState();
    } else {
      console.error("Failed to remove cat from favorites:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateLocalState();
  }, [isFav]);

  const handleClear = () => {
    setQuery("");
    setShowClearButton(false);
    setFilteredCats(isFav);
    setCatsFound(true);
  };

  const handleDescriptionPopup = (event, fav) => {
    setCurrentDescription(fav?.breeds[0]?.description);
    setDescriptionPopupOpen(true);
    setDescriptionPopupAnchorEl(event.currentTarget);
  };

  const handleDescriptionClose = () => {
    setDescriptionPopupOpen(false);
    setDescriptionPopupAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} xl={8}>
            <Typography variant="h4">
              List of favorite cats 😻,
              <Typography component="span" className={classes.spansterClass}>
                {" "}
                {userName}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} xl={4}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                value={query}
                className={classes.searchBar}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Search for cats via name/nickname"
                aria-label="Search 🔎"
                id="basic-addon2"
                InputProps={{
                  endAdornment: showClearButton && (
                    <IconButton onClick={handleClear}>
                      <ClearRounded />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </Grid>
        </Grid>
        {catsFound ? (
          <Grid container spacing={3} mt={2}>
            {filteredCats.map((fav, i) => (
              <Grid container item key={fav.id} xs={12} sm={10} md={6} lg={4}>
                <Card className={classes.catcard}>
                  <img
                    height="250"
                    width="350"
                    src={fav.url}
                    className={classes.imagery}
                  />
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography
                      variant="subtitle1"
                      className={classes.displayNickName}
                      style={{ minHeight: "30px" }}
                    >
                      {fav.nickname ? fav.nickname : ""}
                    </Typography>

                    <Grid container item className={classes.buttons}>
                      <Grid item>
                        {!nickNames[i].assignNicknameAsKey ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              const updatedNickNames = [...nickNames];
                              updatedNickNames[i].assignNicknameAsKey = true;
                              setNickNames(updatedNickNames);
                            }}
                          >
                            Nickname!
                          </Button>
                        ) : (
                          <TextField
                            value={nickNames[i].nickname}
                            onChange={(e) => {
                              const updatedNickNames = [...nickNames];
                              updatedNickNames[i].nickname = e.target.value;
                              setNickNames(updatedNickNames);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const updatedNickNames = [...nickNames];
                                updatedNickNames[i].assignNicknameAsKey = false;
                                setNickNames(updatedNickNames);
                                toggleNickname(
                                  fav,
                                  updatedNickNames[i].nickname
                                );
                              }
                            }}
                          />
                        )}
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpen(fav)}
                        >
                          Unfavourite{" "}
                          <FavoriteOutlined className={classes.unfavoriteHrt} />
                        </Button>
                      </Grid>
                      <Grid item>
                        <IconButton
                          key={fav.id}
                          onClick={(event) =>
                            handleDescriptionPopup(event, fav)
                          }
                        >
                          <Tooltip
                            title="View Description"
                            placement="top"
                            arrow
                          >
                            <InfoOutlined />
                          </Tooltip>
                        </IconButton>
                        {descriptionPopupOpen && (
                          <DescriptionPopup
                            open={descriptionPopupOpen}
                            anchorEl={descriptionPopupAnchorEl}
                            handleClose={handleDescriptionClose}
                            description={currentDescription}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h1"
            className={classes.errorMsg}
            component="div"
            minHeight={"50%"}
          >
            No cats found.
          </Typography>
        )}
        {open ? (
          <ConfirmationModal
            open={open}
            handleClose={handleClose}
            catToRemove={catToRemove}
            classes={classes}
            confirmRemove={confirmRemove}
            buttonText="Unfavourite"
            isLoading={isLoading}
            titleText="Are you sure you want to remove this cat?"
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Favorites;
