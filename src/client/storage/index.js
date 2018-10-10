import { createStore, combineReducers } from 'redux'
import baseReducer from '../reducers/base'
import settings from '../reducers/settings'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
  blacklist: ['base']
}

const app = combineReducers({
  base: baseReducer,
  settings: settings
})

const persistedReducer = persistReducer(persistConfig, app)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
