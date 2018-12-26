import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/actions";
import PropTypes from "prop-types";
import DelButton from "./sub_components/DelButton";
import { confirmAlert } from "react-confirm-alert";

class QuestionDetail extends Component {
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
    this.props.actions.getComments(this.props.qstnId);
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
    this.props.actions.cmtValueUpdate(event.target.value);
  }

  handleSubmit() {
    if (this.props.newComment !== "") {
      this.props.actions.postComment(this.props.qstnId, this.props.newComment);
    }
  }

  handleDelete(cmtId, comment) {
    confirmAlert({
      title: "Are you sure you want to delete this comment?",
      message: comment,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.actions.delComment(cmtId, this.props.qstnId)
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
          <NavLink
            to={`/topic-detail/${this.props.topicId}`}
            className="btn btn-sm btn-info float-right"
          >
            Back
          </NavLink>
        </ol>
        <div className="row" />
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="card text-white rounded-2">
              <div className="form-group">
                <div className="card-heading bg-info">
                  <label
                    htmlFor="comment-field"
                    className="ml-1 mt-1 post-text"
                  >
                    Post new comment
                  </label>
                </div>
                <div className="card-body">
                  <textarea
                    className="form-control"
                    id="comment-field"
                    rows="3"
                    value={this.props.newComment}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  id="comment-button"
                  className="btn btn-success float-right"
                  disabled={this.state.disabled}
                  onClick={this.handleSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-8">
            <div className="card-columns">
              {this.props.comments.map(comment => (
                <div
                  key={comment.ans_id}
                  className="card comment-card bg-light"
                >
                  <div className="card-body">
                    <p className="card-text comment-description">
                      {comment.ans}
                    </p>
                    <DelButton
                      text={comment.ans}
                      id={comment.ans_id}
                      className="delete-comment"
                      handleDelete={this.handleDelete}
                    />
                    <br />
                    <footer className="blockquote-footer float-right mt-2 comment-date">
                      Posted on <cite>{comment.date}</cite>
                    </footer>
                  </div>
                </div>
              ))}
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
    qstnId: ownProps.match.params.qstnId,
    newComment: state.red.newComment,
    comments: state.red.comments,
    qstn: state.red.qstn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

QuestionDetail.propTypes = {
  actions: PropTypes.object,
  qstnId: PropTypes.string,
  topicId: PropTypes.string,
  newComment: PropTypes.string,
  comments: PropTypes.array,
  qstn: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetail);
