import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  GET_CATS_LIST,
  RESET_FAVORITES,
  RANDOM_CAT,
  IS_LOADING,
  GET_BREEDS,
  GET_CATEGORIES,
  UPDATE_FAVORITE_NICKNAME,
  UPDATE_LISTS,
  UPDATE_LISTS_CATS,
  RESET_LISTS,
  REMOVE_LIST,
  REMOVE_CAT
} from "../actions/CatAction";

const initialState = {
  favourite: [],
  catList: [],
  catImageUrl: "",
  getBreeds: [],
  getCategories: [],
  lists: [],
  // isLoading: true
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourite: [...state.favourite, action.payload],
      };
    case REMOVE_FROM_FAVOURITES:
      return {
        ...state,
        favourite: state.favourite.filter((cat) => cat !== action.payload),
      };
    case GET_CATS_LIST:
      // console.log("isLoading:", isLoading);
      return {
        ...state,
        catList: action.payload,
        // isLoading: false
      };
    case RANDOM_CAT:
      return {
        ...state,
        catImageUrl: action.payload,
        // isLoading: false
      };
    case RESET_FAVORITES:
      return {
        ...state,
        favourite: [],
      };
    case GET_BREEDS:
      return {
        ...state,
        getBreeds: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        getCategories: action.payload,
      };
      case UPDATE_FAVORITE_NICKNAME:
      const { cat, catNickname } = action.payload;
      const updatedFav = state.favourite.map((fav) =>
        fav.id === cat.id ? { ...fav, nickname: catNickname } : fav
      );
      return {
        ...state,
        favourite: updatedFav,
      };
      case UPDATE_LISTS:
        console.log(
          "This is action payload when updating the lists",
          action.payload,
          "These are the lists when updating the lists",
          state.lists
        );
        return {
          ...state,
          lists: [...state.lists, action.payload],
        };


      case UPDATE_LISTS_CATS:
  const { updatedList, catIndex } = action.payload;
  return {
    ...state,
    lists: state.lists.map((list) =>
      list.listName === updatedList.listName ? updatedList : list
    ),
  };

    case RESET_LISTS:
      return {
        ...state,
        lists: [],
      };
    case REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list !== action.payload),
      };
      case REMOVE_CAT:
        return {
          ...state,
          catList: state.catList.filter((cat) => cat.id !== action.payload.id),
        }
    default:
      return state;
  }
};

export default mainReducer;