import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

WebFont.load({
  google: {
    families: ["Comfortaa", "Hind Madurai"]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
