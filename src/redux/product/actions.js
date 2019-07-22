import { API } from "../../api-config";
import "isomorphic-fetch";

import {
  GetWithUrl,
  PostWithUrlBody,
  DeleteWithUrl,
  PutWithUrlBody
} from "../../services/url-helper";

/* Action Types */

const INITIALIZE_FETCH_PRODUCT = "INITIALIZE_FETCH_PRODUCT";
const SAVE_PRODUCT_LIST = "SAVE_PRODUCT_LIST";
const SAVE_SINGLE_PRODUCT = "SAVE_SINGLE_PRODUCT";

export const actionTypes = {
  INITIALIZE_FETCH_PRODUCT,
  SAVE_PRODUCT_LIST,
  SAVE_SINGLE_PRODUCT
};

/* Action Creators */

function initializeFetchProduct() {
  return {
    type: INITIALIZE_FETCH_PRODUCT
  };
}

function saveProductList(productList) {
  return {
    type: SAVE_PRODUCT_LIST,
    payload: productList
  };
}

function saveSingleProduct(product) {
  return {
    type: SAVE_SINGLE_PRODUCT,
    payload: product
  };
}

export const actionCreators = {
  initializeFetchProduct,
  saveProductList,
  saveSingleProduct
};

/* Api Call Functions */

export const getProductList = () => {
  return dispatch => {
    dispatch(initializeFetchProduct())
    GetWithUrl(API + "/products/getAll")
      .then(response => response.json())
      .then(response => {
        dispatch(saveProductList(response));
      })
      .catch(error => console.log("Error when fetching product list\n", error));
  };
};

export const getProductListWithCategory = (categoryIds) => {
  return dispatch => {
    dispatch(initializeFetchProduct())
    PostWithUrlBody(API + "/products/getByCategory/", categoryIds)
      .then(response => response.json())
      .then(response => {
        dispatch(saveProductList(response));
      })
      .catch(error => console.log("Error when fetching product list\n", error));
  };
};

export const addProduct = body => {
  return dispatch => {
    PostWithUrlBody(API + "/products/create", body)
      .then(response => response.json())
      //.then(dispatch(getProductList()))
      .catch(error => console.log("Error while adding a new product\n", error));
  };
};

export const deleteProduct = id => {
  return dispatch => {
    DeleteWithUrl(API + "/products/delete/"+ id)
      .then()
      .catch(error => console.log("Errow while deletin' a product\n", error));
  };
};

export const getProduct = id => {
  return dispatch => {
    dispatch(initializeFetchProduct());
    GetWithUrl(API + "/products/getById/" + id)
      .then(response => response.json())
      .then(response => {
        dispatch(saveSingleProduct(response));
      })
      //.then(saveSingleProduct(response))
      .catch(error =>
        console.log("Error while getting product details\n", error)
      );
  };
};

export const updateProduct = (id, body) => {
  console.log("body", body)
  return dispatch => {
    PutWithUrlBody(API + "/products/update/" + id, body)
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          response.json().then(data => {
            console.log("data", data);
            dispatch(saveSingleProduct(data));
          })
        }else {
          console.log("Error.", response);
        }
      })
      .catch(error => console.log("Error while updating a product \n", error));
  };
};
