import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/actions";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getTopics();
  }

  render() {
    return (
      <div className="container-fluid mt-4">
        <div className="card-columns">
          {this.props.topics.map(topic => (
            <div key={topic.topic_id} className="card topic-card bg-light">
              <div className="card-body">
                <h5 className="card-title topic-name">{topic.topic}</h5>
                <p className="card-text topic-description">
                  {topic.description}
                </p>
                <NavLink
                  to={`/topic-detail/${topic.topic_id}`}
                  className="btn btn-sm btn-primary mb-2 float-right view-topic-details"
                >
                  View details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topics: state.red.topics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

Home.propTypes = {
  topics: PropTypes.array,
  actions: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
