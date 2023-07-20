const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const produce = require('immer').produce
const applyMiddleware = redux.applyMiddleware

//action constant
const FECTH_USER_REQUESTED = 'FECTH_USER_REQUESTED'
const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED'
const FECTH_USER_FAILED = 'FECTH_USER_FAILED'

//the initial state
const initialDataState = {
  loading: true,
  data: [],
  error: ''
}

//redux action
const getData = () => {
  return {
    type: FECTH_USER_REQUESTED
  }
}

const getDataSucceeded = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users
  }
}

const getDataFailed = (error) => {
  return {
    type: FECTH_USER_FAILED,
    payload: error
  }
}

const getDataReducer = (state = initialDataState, action) => {
  switch(action.type) {
    case FECTH_USER_REQUESTED:
      console.log(FECTH_USER_REQUESTED)
      return produce(state, (draft) => {
        draft.loading = true
      })
    case FETCH_USER_SUCCEEDED:
      console.log(FETCH_USER_SUCCEEDED)
      return produce(state, (draft) => {
        draft.loading = false,
        draft.data = action.payload
      })
    case FECTH_USER_FAILED:
      console.log(FECTH_USER_FAILED)
      return produce(state,(draft) => {
        draft.loading = false,
        draft.error = action.payload
      })
  }
}

//create a function to call the API
const getDataFromAPI = () => {
  return innerFunction = (dispatch) => {
    dispatch(getData())
    axios.get('https://jsonplaceholder.typicode.com/uses')
      .then(response => {
        const users = response.data.map(user => {return user.id})
        dispatch(getDataSucceeded(users))
      })
      .catch(error => {
        dispatch(getDataFailed(error.message))
      })
  }
}


const store = redux.createStore(getDataReducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(getDataFromAPI())
