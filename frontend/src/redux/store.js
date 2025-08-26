import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userReducer from "../features/userSlice.js"
 import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({ //combining all reducers
  user: userReducer
})

const persistConfig = { //storing in local storage
  key: 'root',
  storage
}

//persist store
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store)