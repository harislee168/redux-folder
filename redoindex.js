//initialize the required variables
const redux = require('redux')
const reduxLogger = require('redux-logger')
const applyMiddleWare = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

const initialCakeState = {
  numOfCakes: 10,
  numOfCakesToRestock: 0,
  totalNoOfCakesSold: 0,
}

const initialIceCreamState = {
  numOfIceCreams: 20,
  numOfIceCreamsToRestock: 0,
  totalNoOfIceCreamsSold: 0
}

//first create the action! What is an action?
//Action in redux is an arrow function that return an object that has type property which will be used as a parameter when doing dispatch!
//Action contain the type e.g. add, reduce, multiply, etc <-- Call to action and it must be an object
const orderCake = (orderQuantity=1) => {
  return {
    type: CAKE_ORDERED,
    payload: {
      orderQuantity: orderQuantity
    }
  }
}

const restockCake = () => {
  return {
    type: CAKE_RESTOCKED,
  }
}

const orderIceCream = (orderQuantity=1) => {
  return {
    type: ICE_CREAM_ORDERED,
    payload: {
      orderQuantity: orderQuantity
    }
  }
}

const restockIceCream = () => {
  return {
    type: ICE_CREAM_RESTOCKED
  }
}

//second create the reducer!
//reducer is an arrow function which has 3 parameters such as (state = initialState, action)
//reducer will transform the prevState and return a newState based on the action.type
//this is where the algorithm, logic and calculation process takes place
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      const tempOrderQuantity = action.payload.orderQuantity
      return {...state,
        numOfCakes: state.numOfCakes - tempOrderQuantity,
        numOfCakesToRestock: state.numOfCakesToRestock + tempOrderQuantity,
        totalNoOfCakesSold: state.totalNoOfCakesSold + tempOrderQuantity
      }
    case CAKE_RESTOCKED:
      return {...state,
        numOfCakes: state.numOfCakes + state.numOfCakesToRestock,
        numOfCakesToRestock: initialCakeState.numOfCakesToRestock
      }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload.orderQuantity,
        numOfIceCreamsToRestock: state.numOfIceCreamsToRestock + action.payload.orderQuantity,
        totalNoOfIceCreamsSold: state.totalNoOfIceCreamsSold + action.payload.orderQuantity
      }
    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + state.numOfIceCreamsToRestock,
        numOfIceCreamsToRestock: initialIceCreamState.numOfIceCreamsToRestock
      }
    default:
      return state
  }
}

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

//create store to hold the state! reducer has the initialState object
const store = redux.createStore(rootReducer, applyMiddleWare(logger))
console.log('Initial state is:', store.getState())

//subscribe
const unsubscribe = store.subscribe(() => {})

store.dispatch(orderCake())
store.dispatch(orderCake(2))
store.dispatch(restockCake())

console.log('use action binds creator')
//other way use bind action creator
const bindActionCreators = redux.bindActionCreators
const actions = bindActionCreators({orderIceCream, restockIceCream}, store.dispatch)
actions.orderIceCream(5)
actions.orderIceCream(2)
actions.restockIceCream()

unsubscribe()
