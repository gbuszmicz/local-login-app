import React, {
  StyleSheet,
  View
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import LoginForm from '../components/LoginForm';
import { saveUser } from '../store/asyncStorage';
import routes from '../routes/router';
import { loginRequest, loginSuccess, loginFailure } from '../actions/user';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(username) {
    // console.log(username)
    let { loginRequest, loginSuccess, loginFailure } = this.props;
    loginRequest(username);
    saveUser(username)
      .then(user => {       
        let u = { 'username': user.username };
        loginSuccess(u);
        let route = routes.getHomeRoute();
        this.props.navigator.push(route);
      })
      .catch(error => {
        // console.log("Error saving user: "+error)
        loginFailure(error);
      });     
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <LoginForm 
          navigator={this.props.navigator} 
          handleLogin={this.handleLogin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.GREEN,
    flexDirection: 'column'
  }
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.get('currentUser').toObject()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (creds) => dispatch(loginRequest(creds)),
    loginSuccess: (user) => dispatch(loginSuccess(user)),
    loginFailure: (errorMessage) => dispatch(loginFailure(errorMessage))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);


