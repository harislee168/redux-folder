//initialize the required variables
const redux = require('redux')
const CAKE_ORDERED = 'CAKE_ORDERED'
const initialState = {
  numOfCakes: 10,
  otherProperty: 0
}

//first create the action! What is an action?
//Action in redux is an arrow function that return an object that has type property which will be used as a parameter when doing dispatch!
//Action contain the type e.g. add, reduce, multiply, etc <-- Call to action and it must be an object
const orderCake = (orderQuantity=1) => {
  return {
    type: CAKE_ORDERED,
    orderQuantity: orderQuantity
  }
}

//second create the reducer!
//reducer is an arrow function which has 3 parameters such as (state = initialState, action)
//reducer will transform the prevState and return a newState based on the action.type
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {...state, numOfCakes: state.numOfCakes - action.orderQuantity}
    default:
      return state
  }
}

//create store to hold the state! reducer has the initialState object
const store = redux.createStore(reducer)
console.log('Initial state is:', store.getState())

//subscribe
const unsubscribe = store.subscribe(() => {console.log('Updated state:', store.getState())})

store.dispatch(orderCake())
store.dispatch(orderCake(3))
store.dispatch(orderCake(2))

unsubscribe()
