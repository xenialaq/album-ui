import axios from 'axios';

import {
  GET_PHOTOS, GET_PHOTOS_FAILED, GET_PHOTO_BY_ID, GET_PHOTO_BY_ID_FAILED,
} from '../constants/actionTypes';

export function getPhotos(from, max) {
  return (dispatch) => axios.get('http://localhost:3000/photos', { params: { from, max } })
    .then((res) => res.data)
    .catch((error) => dispatch({
      type: GET_PHOTOS_FAILED,
      error,
    }))
    .then(({ photos, pages, currentPage }) => dispatch({
      type: GET_PHOTOS,
      photos,
      pages,
      currentPage,
    }));
}

export function getPhotoById(id) {
  return (dispatch) => axios.get(`http://localhost:3000/photos/${id}`)
    .then((photo) => dispatch({
      type: GET_PHOTO_BY_ID,
      photo: { ...photo.data, id, thumbSize: 250 },
    }))
    .catch((error) => dispatch({
      type: GET_PHOTO_BY_ID_FAILED,
      error,
    }));
}
