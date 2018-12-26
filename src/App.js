import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import TopicDetail from "./components/TopicDetail";
import QuestionDetail from "./components/QuestionDetail";
import ReduxToastr from "react-redux-toastr";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid mt-3">
          <Header />
          <br />
          <Route exact path="/" component={Home} />
          <Route path="/topic-detail/:id" component={TopicDetail} />
          <Route
            path="/question-details/:id/:qstnId"
            component={QuestionDetail}
          />
          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-center"
            transitionIn="bounceIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Router>
    );
  }
}

export default App;
