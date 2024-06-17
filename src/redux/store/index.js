import mainReducer from "../reducer/CatReducer";
import userReducer from "../reducer/UserReducer";
import localStorage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const bigReducer = combineReducers({
  cats: mainReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage
};

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);