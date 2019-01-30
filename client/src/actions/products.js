import request from 'axios'

import { getHeaders } from '../utils/api'

export const SHOW_ERROR = 'SHOW_ERROR'
export const PRODUCT_PENDING = 'PRODUCT_PENDING'
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'

export const showError = (errorMessage) => {
  return {
    type: SHOW_ERROR,
    errorMessage: errorMessage
  }
}

export const productPending = (errorMessage) => {
  return {
    type: PRODUCT_PENDING
  }
}

export const productSuccessful = (product) => {
  return {
    type: PRODUCT_SUCCESS,
    product
  }
}

export function sendProduct(product) {
  return (dispatch) => {
    dispatch(productPending())
    return request
      .post('/api/v1/products/addproduct', product, getHeaders())
      .then(res => {
        dispatch(getProducts())
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
}

export function getProducts() {
  return dispatch => {
    dispatch(productPending())
    return request
      .get('/api/v1/products/', getHeaders())
      .then(res => {
        dispatch(productSuccessful(res.data.products))
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
}

export function deleteProduct(productId) {
  return dispatch => {
    dispatch(productPending())
    return request
      .delete(`/api/v1/products/${productId}`, getHeaders())
      .then(res => {
        dispatch(productSuccessful(res.data.products))
        dispatch(getProducts())
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
}
