//First define the constant variable needed

const redux = require('redux')
const produce = require('immer').produce
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const initialInfoState = {
  name: 'Bruce',
  address: {
    street: '123 main street',
    country: 'USA',
    zipcode: '357159'
  }
}

//action of update address
const updateAddress = (street) => {
  return {
    type: UPDATE_ADDRESS,
    payload: {
      street: street
    }
  }
}

//reducer
const infoStateReducer = (state = initialInfoState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload.street
      //   }
      // }
      return produce(state, (draft) => {
        draft.address.street = action.payload.street
      })
    default:
      return state
  }
}

const infoStore = redux.createStore(infoStateReducer)
console.log('Initial state', infoStore.getState())

const unsubscribe = infoStore.subscribe(() => {console.log('Updated state', infoStore.getState())})
infoStore.dispatch(updateAddress('898 New York Street'))

unsubscribe()
