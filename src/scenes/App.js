import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import ExNavigator from '@exponent/react-native-navigator';
import configureStore from '../store/configureStore';
import routes from '../routes/router';
import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  currentUser: {
    isAuthenticated: false, 
    isFetching: false,
    user: Map(),
    errorMessage: ''        
  }
})

export default class LoginApp extends Component {
  render() {
    let store = configureStore(initialState)
    // console.log(store.getState())
    return (
      <Provider store={store}>
        <ExNavigator
          initialRoute={ routes.getSplash() }
          showNavigationBar={ false }
        />
      </Provider>
    )
  }
}
