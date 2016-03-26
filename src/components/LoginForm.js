import React, { 
  Component, 
  Image, 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Colors from '../constants/Colors';
import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      emptyUsernameInput: false,
      inputPlaceholder: 'Choose a username'
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin() { // Callback to container ../scenes/Login.js
    if(this.state.username == '') { 
      this.setState({ 
        emptyUsernameInput: true,
        inputPlaceholder: 'Username cannot be empty'
      });
    }
    if(this.state.username != '') this.props.handleLogin(this.state.username)
  }

  handleChange(username) {
    this.setState({ 
      username, 
      emptyUsernameInput: false,
      inputPlaceholder: 'Choose a username'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{width:150, height:150}} source={require('../assets/react-logo.png')} />
          <Text style={styles.headerText}>React-native + Redux</Text>
          <Text style={{ fontSize:12 }}>Simple login/logout template app</Text>
        </View>
      
        <View style={styles.loginFormContainer}>
          <View style={[styles.inputContainer, this.state.emptyUsernameInput && styles.emptyInput]}>
            <Image style={styles.inputUsername} source={require('../assets/user-alt.png')}/>
            <TextInput
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder={this.state.inputPlaceholder}
              value={this.state.username}
              onChangeText={this.handleChange}
              onSubmitEditing={this.onLogin}
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor={this.state.emptyUsernameInput ? Colors.RED : Colors.MEDIUM_GREY} />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: Colors.WHITE }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  headerText: {
    color: Colors.GREY,
    fontSize: 20,
    marginTop: 0
  },
  loginFormContainer: {
    flex: 0.5,
    paddingLeft: (width * 0.1),
    paddingRight: (width * 0.1)
  },
  button: {
    backgroundColor: Colors.GREEN,
    padding: 10,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  inputUsername: {
    marginLeft: 15,
    width: 20,
    height: 18
  },
  inputContainer: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15
  },
  input: {
    position: 'absolute',
    left: 60,
    top: 0,
    right: 0,
    height: 40,
    fontSize: 14,
    color: Colors.GREY       
  },
  emptyInput: {
    borderColor: Colors.RED
  }
});

LoginForm.propTypes = {
  handleLogin: React.PropTypes.func.isRequired
} 