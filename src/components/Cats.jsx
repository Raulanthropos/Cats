import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState, useSetState } from "react";
import { useSelector } from "react-redux";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { useCategories, useBreeds, queryClient } from "../api/Queries";
import { addToFavourites } from "../redux/actions/CatAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCats, useSearchCats } from "../api/Queries";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const useStyles = styled((theme) => ({
  favoriteHrt: {
    marginLeft: "10px",
  },
  gridItems: {
    justifyContent: "center !important",
    alignItems: "center !important",
    marginInline: "auto !important",
    paddingRight: "350px !important",
    // margin: "0px !important",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "0px !important",
    },
  },
  gridContainer: {
    padding: "0px !important",
    margin: "0px !important",
  },
  errorMsg: {
    color: "red !important",
    marginInline: "auto !important",
  },
  inputLabel: {
    fontSize: "20px !important",
  },
  skeletonCrew: {
    height: "253px !important",
  },
  formControl: {
    width: "540px",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
    },
  },
  limit: {
    width: "50px",
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const Cats = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [local, setLocal] = useState({
    selectedCategory: "",
    selectedBreed: "",
    order: "",
    type: "",
    limit: "",
  });

  const [currentCats, setCurrentCats] = useState([]);

  useEffect(() => {
    searchCats.mutate({
      selectedBreed: local.selectedBreed,
      selectedCategory: local.selectedCategory,
      order: local.order,
      type: local.type,
      limit: local.limit,
    });
  }, [
    local.selectedBreed,
    local.selectedCategory,
    local.order,
    local.type,
    local.limit,
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favouriteCats = useSelector((state) => state.cats.favourite);
  const isFavorite = (cat) => {
    return favouriteCats?.includes(cat.id);
  };

  const toggleFavorite = (cat) => {
    if (!isFavorite(cat)) {
      dispatch(addToFavourites(cat));
    }
  };

  const categories = useCategories({
    queryOptions: {
      onSuccess: (data) => {
        // console.log("This is category data", data);
      },
      onError: (error) => {
        const categoriesError = error;
        setError(categoriesError.message);
      },
    },
  });

  const breeds = useBreeds({
    queryOptions: {
      onSuccess: (data) => {
        // console.log("This is breeds data", data)
      },
      onError: (error) => {
        const breedsError = error;
        setError(breedsError.message);
      },
    },
  });

  const cats = useCats({
    queryOptions: {
      onSuccess: (data) => {
        setCurrentCats([...data]);
      },
      onError: (error) => {
        console.log("Error fetching cats");
      },
    },
  });
  const searchCats = useSearchCats({
    queryOptions: {
      onSuccess: (data) => {
        setCurrentCats([...data]);
      },
      onError: (error) => {
        console.log("Error fetching cats when searching for unicorns");
      },
    },
  });
  const handleBreeds = (event) => {
    setLocal({ ...local, selectedBreed: event.target.value });
  };

  const handleCategories = (event) => {
    setLocal({ ...local, selectedCategory: event.target.value });
  };

  const handleOrder = (event) => {
    setLocal({ ...local, order: event.target.value });
  };

  const handleType = (event) => {
    setLocal({ ...local, type: event.target.value });
  };

  const handleOptionChange = (event) => {
    setLocal({ ...local, limit: event.target.value });
  };

  return (
    <Container>
      <Grid
        justifyContent="space-between"
        alignItems="center"
        container
        style={{ height: "100vh", position: "relative" }}
        spacing={3}
      >
        <Grid
          container
          // className={classes.skeletonCrew}
        >
          <Grid
            container
            item
            justifyContent="center"
            className={classes.gridContainer}
          >
            <Grid
              container
              item
              justifyContent="center"
              spacing={2}
              xs={12}
              m={6}
              l={6}
              className={classes.gridContainer}
            >
              <Grid item className={classes.gridItems}>
                <div style={{ width: "200px" }}>
                  <FormControl className={classes.formControl}>
                    <div style={{ marginBottom: "20px" }}>
                      <h6
                        className={classes.inputLabel}
                        htmlFor="uncontrolled-native"
                      >
                        Filter Breeds
                      </h6>
                    </div>
                    <NativeSelect
                      defaultValue=""
                      onChange={handleBreeds}
                      inputProps={{
                        name: "breed",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">None</option>
                      {breeds?.data?.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                          {breed.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              </Grid>
              <Grid item className={classes.gridItems}>
                <div style={{ width: "200px" }}>
                  <FormControl className={classes.formControl}>
                    <div style={{ marginBottom: "20px" }}>
                      <h6
                        className={classes.inputLabel}
                        htmlFor="uncontrolled-native"
                      >
                        Filter Categories
                      </h6>
                    </div>
                    <NativeSelect
                      defaultValue=""
                      onChange={handleCategories}
                      inputProps={{
                        name: "category",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">None</option>
                      {categories?.data?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              spacing={2}
              xs={12}
              m={6}
              l={6}
              className={classes.gridContainer}
            >
              <Grid
                item
                className={classes.gridItems}
                //  sm={12} md={6}
              >
                <div style={{ width: "200px" }}>
                  <FormControl className={classes.formControl}>
                    <div style={{ marginBottom: "20px" }}>
                      <h6
                        className={classes.inputLabel}
                        htmlFor="uncontrolled-native"
                      >
                        Order
                      </h6>
                    </div>
                    <NativeSelect
                      defaultValue=""
                      onChange={handleOrder}
                      inputProps={{
                        name: "order",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="rand">Random</option>
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              </Grid>
              <Grid item className={classes.gridItems}>
                <div style={{ width: "200px" }}>
                  <FormControl className={classes.formControl}>
                    <div style={{ marginBottom: "20px" }}>
                      <h6
                        className={classes.inputLabel}
                        htmlFor="uncontrolled-native"
                      >
                        Type
                      </h6>
                    </div>
                    <NativeSelect
                      defaultValue=""
                      onChange={handleType}
                      inputProps={{
                        name: "type",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">None</option>
                      <option value="jpg">Static (JPG)</option>
                      <option value="png">Static (PNG)</option>
                      <option value="gif">Animated</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: "32px" }}>
              <FormControl>
                <NativeSelect
                  onChange={handleOptionChange}
                  value={local.limit}
                  inputProps={{
                    name: "type",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          style={{ height: "900px", width: "100vw", marginTop: "50px" }}
          spacing={3}
        >
          {cats.isLoading || searchCats.isLoading ? (
            <>
              <Grid
                container
                item
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                {(() => {
                  const skeletons = [];
                  for (let i = 0; i < 9; i++) {
                    skeletons.push(
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={350}
                        height={275}
                      />
                    );
                  }
                  return skeletons;
                })()}
              </Grid>
            </>
          ) : (cats.isSuccess || searchCats.isSuccess) &&
            currentCats?.length > 0 ? (
            currentCats.map((cat) => (
              <Grid item xs={12} md={6} lg={4} key={cat.id}>
                <Card className="cat-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={cat.url}
                    alt={cat.id}
                    className="cat-image"
                  />
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h5" component="div" className="cat-id">
                      {cat.id}
                    </Typography>
                    {favouriteCats.includes(cat) ? (
                      <Typography variant="subtitle1">
                        <strong>Cat added to favorites!</strong>
                      </Typography>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => toggleFavorite(cat)}
                        >
                          Favourite{" "}
                          <FavoriteBorderOutlined
                            color="error"
                            className={classes.favoriteHrt}
                          />
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cats;
