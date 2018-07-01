import React from 'react';
import { ADD_LIST, DELETE_LIST, ADD_ITEM, DELETE_ITEM, ARCHIVE_LIST } from '../actions/index';


export default function listsReducer(state = [], action) {
  switch(action.type) {
    case ADD_LIST:
      return [
        ...state,
        {
          id: Date.now(),
          date: Date.now(),
          name: action.payload,
          archived: false,
          items: []
        }
        ];
    case DELETE_LIST:
      const listId = action.payload;
      return state.filter(list => list.id !== listId);
    case ARCHIVE_LIST:
      const archiveListIndex = state.findIndex(list => list.id === action.payload);
      return Object.assign(
       [...state],
       {[archiveListIndex]:
         Object.assign({}, state[archiveListIndex], {archived: true})});
    case ADD_ITEM:
      const listIndex = action.payload.listIndex;
      const item = action.payload.item;
      const list = state.filter(list => list.id === listIndex);
      const listToAddItemIndex = state.findIndex(list => list.id === listIndex);
      return Object.assign(
       [...state],
       {[listToAddItemIndex]:
         Object.assign({}, state[listToAddItemIndex], {items: list[0].items.concat(item)})});
    case DELETE_ITEM:
      const deleteListIndex = action.payload.listIndex;
      const itemIndex = action.payload.itemIndex;
      const deleteList = state.filter(list => list.id === deleteListIndex);
      const listToDeleteItemIndex = state.findIndex(list => list.id === deleteListIndex);
      return Object.assign(
       [...state],
       {[listToDeleteItemIndex]:
         Object.assign({}, state[listToDeleteItemIndex], {items: deleteList[0].items.filter((item, index) => index !== itemIndex)})});
      default:
        return state;
    }
}
