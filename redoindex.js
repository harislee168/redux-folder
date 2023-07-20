//initialize the required variables
const redux = require('redux')
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const initialState = {
  numOfCakes: 10,
  numofCakesToRestock: 0,
  totalNoOfCakesSold: 0
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

//second create the reducer!
//reducer is an arrow function which has 3 parameters such as (state = initialState, action)
//reducer will transform the prevState and return a newState based on the action.type
//this is where the algorithm, logic and calculation process takes place
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      const tempOrderQuantity = action.payload.orderQuantity
      return {...state,
        numOfCakes: state.numOfCakes - tempOrderQuantity,
        numofCakesToRestock: state.numofCakesToRestock + tempOrderQuantity,
        totalNoOfCakesSold: state.totalNoOfCakesSold + tempOrderQuantity
      }
    case CAKE_RESTOCKED:
      return {...state,
        numOfCakes: state.numOfCakes + state.numofCakesToRestock,
        numofCakesToRestock: initialState.numofCakesToRestock
      }
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
store.dispatch(restockCake())

console.log('use action binds creator')
//other way use bind action creator
const bindActionCreators = redux.bindActionCreators
const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)
actions.orderCake(5)
actions.orderCake(2)
actions.restockCake()

unsubscribe()
