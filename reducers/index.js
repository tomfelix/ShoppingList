import { combineReducers } from 'redux';
import listsReducer from './lists-reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const rootPersistConfig = {
  key: 'root',
  storage: storage
};

const listsPersistConfig = {
  key: 'lists',
  storage: storage
};

const rootReducer = combineReducers({
  lists: listsReducer
});


export default persistReducer(rootPersistConfig, rootReducer);
