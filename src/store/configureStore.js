import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
// import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers/index'

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS() // Transformation necessary because of Immutable.js
})
const combineMiddleware = applyMiddleware(
  loggerMiddleware, 
  thunkMiddleware
)
const enhancer = compose(
  combineMiddleware
  // devTools()  // To use remote dev tools enable this and the import devTools
)

export default function configureStore(initialState) {
  return createStore(
    reducer, 
    initialState,
    enhancer
  )
}