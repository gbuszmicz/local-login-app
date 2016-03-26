import React, {
  StyleSheet,
  View
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import routes from '../routes/router';
import { getUser } from '../store/asyncStorage';
import { loginRequest, loginSuccess } from '../actions/user';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: true }; // To show spinner
  }

  componentDidMount() {
    getUser().then(user => {
      if(!user) {
        // console.log('No user found')
        this.props.navigator.push( routes.getLogin() );
        
      } else {
        // console.log('User found: ',user)
        let creds = { 'username': user.username } // also = user object
        this.props.loginRequest(creds)
        setTimeout(() => { // Just to simulate network request
          this.props.loginSuccess(creds) // using creds as user object
          this.props.navigator.push( routes.getHomeRoute() );
        }, 750);
      }
    });
  }

  componentWillUnmount() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Spinner 
          visible={this.state.visible} 
          overlayColor={Colors.LIGHT_GREY} 
          color={Colors.GREEN}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.GREEN,
    top: 0,
    left: 0,
    width,
    height
  }
});

Splash.propTypes = {
  user: React.PropTypes.object.isRequired,
  loginRequest: React.PropTypes.func.isRequired,
  loginSuccess: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.get('currentUser').toObject()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (creds) => dispatch(loginRequest(creds)),
    loginSuccess: (creds) => dispatch(loginSuccess(creds))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);


