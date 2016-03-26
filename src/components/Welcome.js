import React, { 
  View, 
  Text,
  TouchableOpacity 
} from 'react-native';
import Colors from '../constants/Colors';

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    let { user } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.welcome }>
          React Native Redux App Template
        </Text>
        <Text style={ styles.instructions }>
          You are authenticated as:
        </Text>
        <Text style={ styles.username }>
          {user.username}
        </Text>
        <Text style={ styles.instructions }>
          {'\n'}
          You are now in ./src/scenes/Home.js
        </Text>
        <Text style={ styles.instructions }>
          Press Cmd+R to reload,
          {'\n'}
          Cmd+D or shake for dev menu
          {'\n'}
          Enable 'Debug in Chrome' to check redux actions
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
          <Text style={{ color: Colors.WHITE }}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: Colors.DARK_GREY,
    marginBottom: 10
  },
  button: {
    marginTop: 50,
    backgroundColor: Colors.GREEN,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  username: {
    fontWeight: 'bold', 
    color: Colors.BLACK, 
    marginTop: -10,
    fontSize: 16
  }
};

Welcome.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleLogout: React.PropTypes.func.isRequired
}

export default Welcome;
