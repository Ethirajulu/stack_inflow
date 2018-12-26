import * as types from "../constants/actionTypes";
import { toastr } from "react-redux-toastr";

const API = "http://localhost:8080";
const GET_TOPICS = "/getTopics";
const GET_TOPIC_DETAILS = "/getTopicDetails/";
const POST_QSTN = "/saveQstn/";
const DEL_QSTN = "/delQstn/";
const GET_COMMENTS = "/getCmts/";
const POST_CMT = "/saveCmt/";
const DEL_CMT = "/delCmt/";

export function setTopicsAction(topics) {
  return { type: types.TOPICS, topics };
}

export function setTopicDetailsAction(topicDetails) {
  return { type: types.TOPIC_DETAILS, topicDetails };
}

export function qstnValueUpdate(newQstn) {
  return { type: types.NEW_QSTN, newQstn };
}

export function addQstnAction(qstn) {
  return { type: types.ADD_QSTN, qstn };
}

export function setCommentsAction(comments) {
  return { type: types.COMMENTS, comments };
}

export function cmtValueUpdate(newComment) {
  return { type: types.NEW_CMTS, newComment };
}

export function addCmtAction(comment) {
  return { type: types.ADD_CMT, comment };
}

export function getTopics() {
  return dispatch => {
    fetch(API + GET_TOPICS)
      .then(response => {
        if (response.status == 204) {
          toastr.warning("No topics found");
          return [];
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        return response.json();
      })
      .then(topics => {
        dispatch(setTopicsAction(topics));
      })
      .catch(error => toastr.error(error));
  };
}

export function getTopicDetails(id) {
  return dispatch => {
    fetch(API + GET_TOPIC_DETAILS + id)
      .then(response => {
        if (response.status == 204) {
          toastr.warning(
            "No questions found for the topic! Please post your question in the box provided"
          );
          return [];
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        return response.json();
      })
      .then(topicsDetails => {
        dispatch(setTopicDetailsAction(topicsDetails));
      })
      .catch(error => toastr.error(error));
  };
}

export function postQuestion(topicId, newQstn) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: newQstn
  };
  return dispatch => {
    fetch(API + POST_QSTN + topicId, options)
      .then(response => {
        if (response.status == 204) {
          toastr.error("Invalid topic id");
          return {};
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        return response.json();
      })
      .then(qstn => {
        dispatch(addQstnAction(qstn));
        toastr.success("New question added");
        dispatch(qstnValueUpdate(""));
      })
      .catch(error => toastr.error(error));
  };
}

export function delQuestion(qstnId, topicId) {
  return dispatch => {
    fetch(API + DEL_QSTN + qstnId, { method: "delete" })
      .then(response => {
        if (response.status == 204) {
          toastr.warning("Invalid question id");
          return;
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        dispatch(getTopicDetails(topicId));
        toastr.info("Successfully deleted");
      })
      .catch(error => toastr.error(error));
  };
}

export function getComments(qstnId) {
  return dispatch => {
    fetch(API + GET_COMMENTS + qstnId)
      .then(response => {
        if (response.status == 204) {
          toastr.warning("No comments found");
          return [];
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        return response.json();
      })
      .then(comments => {
        dispatch(setCommentsAction(comments));
      })
      .catch(error => toastr.error(error));
  };
}

export function postComment(qstnId, newComment) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: newComment
  };
  return dispatch => {
    fetch(API + POST_CMT + qstnId, options)
      .then(response => {
        if (response.status == 204) {
          toastr.error("Invalid question id");
          return {};
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        return response.json();
      })
      .then(comment => {
        dispatch(addCmtAction(comment));
        toastr.success("New comment added");
        dispatch(cmtValueUpdate(""));
      })
      .catch(error => toastr.error(error));
  };
}

export function delComment(cmtId, qstnId) {
  return dispatch => {
    fetch(API + DEL_CMT + cmtId, { method: "delete" })
      .then(response => {
        if (response.status == 204) {
          toastr.warning("Invalid comment id");
          return;
        } else if (response.status == 400) {
          toastr.error("Invalid input");
          return [];
        }
        dispatch(getComments(qstnId));
        toastr.info("Successfully deleted");
      })
      .catch(error => toastr.error(error));
  };
}
