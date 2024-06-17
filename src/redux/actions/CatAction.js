export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES"
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES"
export const GET_CATS_LIST = "GET_CATS_LIST"
export const SET_USER_INFO = "SET_USER_INFO";
export const LOGOUT_USER = "LOGOUT_USER";
export const RESET_FAVORITES = "RESET_FAVORITES";
export const RANDOM_CAT = "RANDOM_CAT";
export const IS_LOADING = "IS_LOADING";
export const GET_BREEDS = "GET_BREEDS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_FAVORITE_NICKNAME = "UPDATE_FAVORITE_NICKNAME";
export const UPDATE_LISTS_CATS = "UPDATE_LISTS_CATS";
export const UPDATE_LISTS = "UPDATE_LISTS";
export const RESET_LISTS = "RESET_LISTS";
export const REMOVE_LIST = "REMOVE_LIST";
export const REMOVE_CAT = "REMOVE_CAT";
export const DASHBOARD_OPEN = "DASHBOARD_OPEN";
const API_KEY = process.env.REACT_APP_API_KEY;

export const isLoading = (isLoading) => ({
  type: IS_LOADING,
  payload: isLoading
})

export const removeFromFavourites = (fav) => (
    {
    type: REMOVE_FROM_FAVOURITES,
    payload: fav
}
)

// export const updateFavoriteNickname = (cat, nickname) => {
//   console.log("Cat in action", cat, "nickname in action", nickname);
//   return {
//     type: UPDATE_FAVORITE_NICKNAME,
//     payload: {
//       cat,
//       nickname,
//     },
//   };
// };

export const updateFavoriteNickname = (cat, catNickname) => {
  return {
    type: "UPDATE_FAVORITE_NICKNAME",
    payload: {
      cat: cat,
      catNickname: catNickname,
    },
  };
};

export const updateListsCats = (updatedList, catIndex) => {
  console.log("This is the action. This is the updatedList", updatedList, "This is the alleged catIndex", catIndex)
  return {
    type: UPDATE_LISTS_CATS,
    payload: { updatedList, catIndex }
  };
}

export const updateLists = (newList) => {
  return {
    type: UPDATE_LISTS,
    payload: newList
  };
}

export const removeList = (list) => {
  return {
    type: REMOVE_LIST,
    payload: list
  }
}

export const removeCat = (cat) => {
  return {
    type: REMOVE_CAT,
    payload: cat
  }
}
export const addToFavourites = (fav) => (
    {
        type: ADD_TO_FAVOURITES,
        payload: fav
    }
)

export const setUserInfo = (user) => (
  {
      type: SET_USER_INFO,
      payload: user
  }
)

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const resetFavorites = () => ({
  type: RESET_FAVORITES
});

export const resetLists = () => ({
  type: RESET_LISTS
});



export const getListOfCats = (breed = null, category = null) => {
  const baseEndpoint = "https://api.thecatapi.com/v1/images/search?limit=9";
  const options = {
    method: "GET",
    headers: { "x-api-key": API_KEY },
  };
  return async (dispatch, getState) => {
    try {
      let url = baseEndpoint;
      if (breed) {
        url += `&breed_ids=${breed}`;
      }
      if (category) {
        url += `&category_ids=${category}`;
      }
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_CATS_LIST,
          payload: data,
        });
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
};


    export const getBreeds = (breed) => {
      let baseEndpoint = "https://api.thecatapi.com/v1/breeds"
      return async (dispatch) => {
        try {
          const response = await fetch(baseEndpoint);
          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: GET_BREEDS,
              payload: data,
            });
          } else {
            alert("Cries in Spanish");
          }
        } catch (error) {
          console.log(error);
        }
      };
    };

    export const getCategories = (category) => {
      let baseEndpoint = "https://api.thecatapi.com/v1/categories"
      return async (dispatch) => {
        try {
          const response = await fetch(baseEndpoint);
          if (response.ok) {
            const data = await response.json();
            // console.log(" Dataaaaaaaaa", data);
            dispatch({
              type: GET_CATEGORIES,
              payload: data,
            });
          } else {
            alert("Cries in Spanish");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    export const welcomeCat = () => {
      const baseEndpoint = 'https://api.thecatapi.com/v1/images/search'
      const options = {
              method: 'GET',
              headers: { 'x-api-key': API_KEY } ,
      }
        return async (dispatch, getState) => {
            try {
                const response = await fetch(baseEndpoint, options)
                if (response.ok) {
                  const data = await response.json()
                  dispatch(
                    {
                        type: RANDOM_CAT,
                        payload: data[0].url,
                    }
                  )
                } else {
                  alert('Error fetching results')
                }
              } catch (error) {
                console.log(error);
              }
            }
        }

        export const dashboardOpen = () => ({
          type: DASHBOARD_OPEN
        })