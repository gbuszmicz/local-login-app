import ExNavigator from '@exponent/react-native-navigator'
import Home from '../scenes/Home'
import Login from '../scenes/Login'
import Splash from '../scenes/Splash'

const routes = {}

// Home screen
// This is private. The user must be authenticated
routes.getHomeRoute = () => ({
  getSceneClass() {
    return Home;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.ZoomFromFront;
  }
})

// Login form
// If user is not authenticated
routes.getLogin = () => ({
  getSceneClass() {
    return Login;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.FloatFromLeft;
  }
})

// Splash: default route
// Check if user is already authenticated
routes.getSplash = () => ({
  getSceneClass() {
    return Splash;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.ZoomFromFront;
  }
})

export default routes