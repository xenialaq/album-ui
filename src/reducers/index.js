import _ from 'lodash';
import { GET_PHOTOS, GET_PHOTO_BY_ID } from '../constants/actionTypes';

const initialState = {
  photos: [],
  photosData: {},
  baseUrl: 'http://localhost:3000',
};

function rootReducer(state = initialState, action) {
  const state2 = _.cloneDeep(state);
  if (action.type === GET_PHOTOS) {
    state2.photos = action.photos;
    state2.pages = action.pages;
    state2.currentPage = action.currentPage;
  }
  if (action.type === GET_PHOTO_BY_ID) {
    state2.photosData[action.photo.id] = action.photo;
  }
  return state2;
}

export default rootReducer;
