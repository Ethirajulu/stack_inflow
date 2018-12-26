import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/actions";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import DelButton from "./sub_components/DelButton";

class TopicDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.actions.getTopicDetails(this.props.topicId);
  }

  handleChange(event) {
    if (event.target.value === "") {
      this.setState({
        disabled: true
      });
    } else {
      this.setState({
        disabled: false
      });
    }
    this.props.actions.qstnValueUpdate(event.target.value);
  }

  handleSubmit() {
    if (this.props.newQstn !== "") {
      this.props.actions.postQuestion(this.props.topicId, this.props.newQstn);
    }
  }

  handleDelete(qstnId, qstn) {
    confirmAlert({
      title: "Are you sure you want to delete this question?",
      message: qstn,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            this.props.actions.delQuestion(qstnId, this.props.topicId)
        },
        {
          label: "No"
        }
      ]
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <NavLink to="/" className="btn btn-sm btn-info float-right">
            Back
          </NavLink>
        </ol>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="card-columns">
              {this.props.topicsDetails.map(topicDetail => (
                <div
                  key={topicDetail.qstn_id}
                  className="card question-card bg-light"
                >
                  <div className="card-body">
                    <p className="card-text question-description">
                      {topicDetail.qstn}
                    </p>
                    <NavLink
                      to={`/question-details/${this.props.topicId}/${
                        topicDetail.qstn_id
                      }`}
                      className="btn btn-sm btn-secondary view-comments"
                    >
                      View comments
                    </NavLink>
                    <DelButton
                      text={topicDetail.qstn}
                      id={topicDetail.qstn_id}
                      className="delete-question"
                      handleDelete={this.handleDelete}
                    />
                    <br />
                    <footer className="blockquote-footer float-right mt-2 question-date">
                      Posted on <cite>{topicDetail.date}</cite>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="card text-white rounded-2">
              <div className="form-group">
                <div className="card-heading bg-info">
                  <label
                    htmlFor="question-field"
                    className="ml-1 mt-1 post-text"
                  >
                    Post new question here
                  </label>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control"
                    id="question-field"
                    rows="3"
                    value={this.props.newQstn}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  id="question-button"
                  className="btn btn-success float-right"
                  disabled={this.state.disabled}
                  onClick={this.handleSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    topicId: ownProps.match.params.id,
    topicsDetails: state.red.topicsDetails,
    newQstn: state.red.newQstn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

TopicDetail.propTypes = {
  actions: PropTypes.object,
  topicId: PropTypes.string,
  topicsDetails: PropTypes.array,
  newQstn: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDetail);
