import { AsyncStorage } from 'react-native';

let parseJson = json => JSON.parse(json);

export function getUser() {
  return AsyncStorage
          .getItem('user')
          .then(parseJson);
}

export function saveUser(username) {
  return new Promise((resolve, reject) => {
    let user = {username};
    let userString = JSON.stringify(user);

    AsyncStorage.setItem('user', userString);
    resolve(user);
  });
}

export function removeUser() {
  return AsyncStorage.removeItem('user');
}
