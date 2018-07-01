export const LISTS = 'LISTS';
export const ADD_LIST = 'ADD_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const ARCHIVE_LIST = 'ARCHIVE_LIST';


export function archiveList(id) {
  return {
    type: ARCHIVE_LIST,
    payload: id
  }
}

export function addList(name) {
  return {
    type: ADD_LIST,
    payload: name
  }
}

export function deleteList(id) {
  return {
    type: DELETE_LIST,
    payload: id
  }
}

export function addListItem(listIndex, item) {
  return {
    type: ADD_ITEM,
    payload: {
      listIndex,
      item
    }
  }
}

export function deleteListItem(listIndex, itemIndex) {
  return {
    type: DELETE_ITEM,
    payload: {
      listIndex,
      itemIndex
    }
  }
}
