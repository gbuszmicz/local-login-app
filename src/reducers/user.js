
import { Map, fromJS } from 'immutable';
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE 
} from '../actions/user'

// User state in Redux
// "currentUser": {
//   "isAuthenticated": true,
//   "isFetching": false,
//   "user": {
//     "username": "gonzalo",
//     "uid": 12312131231,
//     "profilePicture": "http://....",
//     "fullname": "Gonzalo F. Buszmicz"
//   },
//   "errorMessage": ""
// }

const initialState = fromJS({
  'isAuthenticated': false,
  'isFetching': false, 
  'user': Map(),
  'errorMessage': ''
})
// let initialState = Map()

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
              .set('isAuthenticated', false)
              .set('isFetching', true)
              .setIn(['user','username'], action.creds.username)
              .set('errorMessage', '');

    case LOGIN_SUCCESS:
      return state
              .set('isAuthenticated', true)
              .set('isFetching', false)
              .setIn(['user','username'], action.user.username)
              .set('errorMessage', '');

    case LOGIN_FAILURE:
      return state
              .set('isAuthenticated', false)
              .set('isFetching', false)
              .set('user', Map())
              .set('errorMessage', action.errorMessage);

    case LOGOUT_REQUEST:
      return state
              .set('isFetching', true)
              .set('errorMessage', '');

    case LOGOUT_SUCCESS:
      return state
              .set('isAuthenticated', false)
              .set('isFetching', false)
              .set('user', Map())
              .set('errorMessage', '');

    case LOGOUT_FAILURE:
      return state
              .set('isFetching', false)
              .set('errorMessage', action.errorMessage);

    default:
      return state
  }
}