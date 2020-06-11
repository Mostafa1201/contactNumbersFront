// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: "authce9d77b308c149d5992a80073637e4d5",
  BASE_URL: "http://localhost:3000/",
  API_URL: "http://localhost:3000/",
  firebaseConfig: {
    apiKey: "AIzaSyCR4WkX-aobMdxP9u9hvjCHvJv24ZRuWEM",
    authDomain: "contact-numbers-77661.firebaseapp.com",
    databaseURL: "https://contact-numbers-77661.firebaseio.com",
    projectId: "contact-numbers-77661",
    storageBucket: "contact-numbers-77661.appspot.com",
    messagingSenderId: "314511128185",
    appId: "1:314511128185:web:32b02112e660fdf5a846a8"
  }
};