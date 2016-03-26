// Ref.: http://kyrisu.com/2016/01/31/unit-testing-react-native-components-with-enzyme-part-1/

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

// import auth from '../src/reducers/user';
import configureStore from '../src/store/configureStore';
import { 
  loginRequest, loginSuccess, loginFailure,
  logoutRequest, logoutSuccess, logoutFailure
} from '../src/actions/user';


describe('User reducer', () => {

   /***********************************************/
  it('handles LOGIN_REQUEST', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: false, 
        isFetching: false,
        user: Map(),
        errorMessage: ''        
      })
    })
    let store = configureStore(initialState);
    let creds = {
      'username': 'gonzalo',
      'password': 'sarasa'
    }
    store.dispatch(loginRequest(creds))

    var state = store.getState();
    console.log(state)
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
        'isAuthenticated': false, 
        'isFetching': true,
        'user': Map({
          'username':'gonzalo'
        }),
        'errorMessage': ''
      })
    )  
  })

   /***********************************************/
  it('handles LOGIN_SUCCESS', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: false, 
        isFetching: true,
        user: Map(),
        errorMessage: ''
      })
    })
    const store = configureStore(initialState);
    let user = {
      'username': 'gonzalo'
    }
    store.dispatch(loginSuccess(user))

    var state = store.getState();
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
      'isAuthenticated': true, 
      'isFetching': false,
      'user': Map({
        'username': 'gonzalo'
      }),
      'errorMessage': ''
    }))  
  })

  /***********************************************/
  it('handles LOGIN_FAILURE', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: false, 
        isFetching: true,
        user: Map({
          username: 'gonzalo'          
        }),
        errorMessage: ''
      })
    })
    const store = configureStore(initialState);

    store.dispatch(loginFailure('Authentication error'))
    var state = store.getState();
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
      'isAuthenticated': false, 
      'isFetching': false,
      'user': Map(),
      'errorMessage': 'Authentication error'
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_REQUEST', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: true, 
        isFetching: false,
        user: Map({
          username: 'gonzalo'
        }),
        errorMessage: ''
      })
    })
    const store = configureStore(initialState);

    store.dispatch(logoutRequest())
    var state = store.getState();
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
      'isAuthenticated': true, 
      'isFetching': true,
      'user': {
        'username': 'gonzalo'
      },
      'errorMessage': ''
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_SUCCESS', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: true, 
        isFetching: true,
        user: Map({
          username: 'gonzalo'
        }),
        errorMessage: ''
      })
    })
    const store = configureStore(initialState);

    store.dispatch(logoutSuccess())
    var state = store.getState();
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
      isAuthenticated: false, 
      isFetching: false,
      user: Map(),
      errorMessage: ''
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_FAILURE', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: true, 
        isFetching: true,
        user: Map({
          username: 'gonzalo'          
        }),
        errorMessage: ''
      })
    })
    const store = configureStore(initialState);

    store.dispatch(logoutFailure('Error logging out'))
    var state = store.getState();
    var currentUser = state.get('currentUser');

    expect(currentUser).to.equal(fromJS({
      'isAuthenticated': true, 
      'isFetching': false,
      'user': Map({
        'username': 'gonzalo'
      }),
      'errorMessage': 'Error logging out'
    }))  
  });

  /***********************************************/
  it('handles a series of actions: LOGIN -> LOGOUT', () => {
    const initialState = Map({
      currentUser: Map({
        isAuthenticated: false, 
        isFetching: false,
        user: Map(),
        errorMessage: ''        
      })
    })
    const store = configureStore(initialState);
    let creds = {
      'username': 'gonzalo'
    }
    let user = {
      'username': 'gonzalo'
    }

    store.dispatch(loginRequest(creds))
    store.dispatch(loginSuccess(user))
    store.dispatch(logoutRequest())
    store.dispatch(logoutSuccess())

    var state = store.getState();
    var currentUser = state.get('currentUser');
    
    expect(currentUser).to.equal(fromJS({
      'isAuthenticated': false, 
      'isFetching': false,
      'user': Map(),
      'errorMessage': ''
    }))
    
    // const actions = [
    //   {type: 'LOGIN_REQUEST', creds: creds},
    //   {type: 'LOGIN_SUCCESS', user: user},
    //   {type: 'LOGOUT_REQUEST'},
    //   {type: 'LOGOUT_SUCCESS'}
    // ];
    // const finalState = actions.reduce(auth, Map());
    // expect(finalState).to.equal(fromJS({
    //   'isAuthenticated': false, 
    //   'isFetching': false,
    //   'user': '',
    //   'errorMessage': ''
    // }))
  });
});
