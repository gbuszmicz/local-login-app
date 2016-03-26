# A simple local login app template

[![Dependency Status](https://david-dm.org/gbuszmicz/local-login-app.svg?style=flat)](https://david-dm.org/gbuszmicz/local-login-app)
[![devDependency Status](https://david-dm.org/gbuszmicz/local-login-app/dev-status.svg?style=flat)](https://david-dm.org/gbuszmicz/local-login-app#info=devDependencies)

A simple and local login/logout application template using [React-native](http://facebook.github.io/react-native/) and [Redux](http://rackt.github.io/redux/index.html) with [ImmutableJS](https://facebook.github.io/immutable-js/)

Tested only with **Android** so far

<p align="center">
  <img src ="https://zippy.gfycat.com/ParchedCrispCranefly.gif" />
</p>

You can login with any username you like.
It saves the username into the [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) (like local storage in HTML5), in the device.
If you are authenticated and close the App, next time you open it you will still be authenticated.
This application works **100% local** and does not have any network interaction.


## Requirements
- [Node](https://nodejs.org) 4.x or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Android SDK](https://developer.android.com/sdk/) for Android development (optional)
- [Android Lollipop](https://www.android.com/versions/lollipop-5-0/) or better for Android device testing (optional)
- [Genymotion](https://www.genymotion.com/) or any other Android emulator (optional)

## Stack
- [React Native](https://facebook.github.io/react-native/), for building native apps using react
- [Redux](http://rackt.github.io/redux/index.html), a predictable state container for Javascript apps
- [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) to use Redux DevTools remotely for React Native apps
- [Babel](http://babeljs.io/), for ES6+ support
- [Immutable](https://facebook.github.io/immutable-js/), an immutable persistent data collections for Javascript
- [ExNavigator](https://github.com/exponentjs/ex-navigator), a route-centric navigation built on top of React Native's Navigator    
- [Mocha](https://github.com/mochajs/mocha/), a simple, flexible, fun JavaScript test framework for node.js and the browser


## Installation
Just [clone](github-windows://openRepo/https://github.com/gbuszmicz/local-login-app.git) the repo
and start :
```shell
$ git clone https://github.com/gbuszmicz/local-login-app.git LoginApp
$ cd LoginApp
$ npm install    # Install packages and libraries listed in ./package.json
```
And see [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) to install requirement tools.

### Usage
#### Build the app (debug-mode) into your emulator or device
You can use [Genymotion](https://www.genymotion.com/) as emulator for Android. 
You can also use your [Android device](https://facebook.github.io/react-native/docs/running-on-device-android.html). 
First of all check you have one (and only one) device connected:
```shell
$ adb devices
List of devices attached
192.168.58.101:5555    device
```

If you are running the app in a fisical device you will need to enable the ports (note that this option is available on devices running Android 5.0):
```shell
$ npm run android-setup-port    # adb reverse tcp:8081 tcp:8080
```

Then, just run (emulator/device):
```shell
$ react-native run-android
```

Once the app is built run this command to start the development server:
```shell
$ npm start    # or: react-native start
```
Note that the app only works with the development server on.

#### Testing the modules
You can test the reducers and actions
```shell
$ npm run test
```

For live testing run:
```shell
$ npm run test:watch
```

You may want to remove ```redux-logger``` from ```src/store/configureStore.js``` for a cleaner testing. Just comment this line in that file:
```javascript
const combineMiddleware = applyMiddleware(
  //loggerMiddleware, 
  thunkMiddleware
)
```

#### Linting the code
```shell
$ npm run lint
```

### Redux DevTools
Update ```src/store/configureStore.js```:

Replace this:
```javascript
import { Platform } from 'react-native'
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
```
with this (just uncomment the commented 2 lines):
```javascript
import { Platform } from 'react-native'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import devTools from 'remote-redux-devtools'
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
  combineMiddleware,
  devTools()  // To use remote dev tools enable this and the import devTools
)

export default function configureStore(initialState) {
  return createStore(
    reducer, 
    initialState,
    enhancer
  )
}
```

Use ```Redux Devtools``` [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to check the redux actions and state changes.
Also you can select ```Debug in Chrome``` within the emulator ([Genymotion](https://www.genymotion.com/) for example) to check redux states in the inspection window


### Bundling APK file for release
To distribute this Android application via Google Play store or to other devices, you'll need to generate a signed release APK.
Follow the [oficial documentation](https://facebook.github.io/react-native/docs/signed-apk-android.html)


### Comments and issues
Feel free to contact me in [twitter](https://twitter.com/gbuszmicz) or [create an issue](https://github.com/gbuszmicz/local-login-app/issues/new)
