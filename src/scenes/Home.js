import React from 'react-native';
import { connect } from 'react-redux';
import routes from '../routes/router';
import { removeUser } from '../store/asyncStorage';
import { logoutRequest, logoutSuccess, logoutFailure } from '../actions/user';
import Welcome from '../components/Welcome';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    let { logoutRequest, logoutSuccess, logoutFailure } = this.props;
    logoutRequest();
    removeUser()
      .then(() => {       
        logoutSuccess()
        let route = routes.getLogin();
        this.props.navigator.push(route);
      })
      .catch(error => {
        logoutFailure(error)
      });     
  }

  render() {
    const { user } = this.props;
    return (
      <Welcome 
        user={user}
        handleLogout={this.handleLogout} 
      />
    )
  }
}

Home.propTypes = {
  user: React.PropTypes.object.isRequired,
  logoutRequest: React.PropTypes.func.isRequired,
  logoutSuccess: React.PropTypes.func.isRequired,
  logoutFailure: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return { 
    user: state.get('currentUser').get('user').toObject()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () =>  dispatch(logoutRequest()),
    logoutSuccess: () => dispatch(logoutSuccess()),
    logoutFailure: (errorMessage) => dispatch(logoutFailure(errorMessage))
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);
