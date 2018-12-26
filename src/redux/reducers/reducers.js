import * as types from "../constants/actionTypes";
import initialState from "../constants/initialState";

export default function red(state = initialState.qnaApp, action) {
  switch (action.type) {
    case types.TOPICS:
      return { ...state, topics: action.topics };
    case types.TOPIC_DETAILS:
      return { ...state, topicsDetails: action.topicDetails };
    case types.NEW_QSTN:
      return { ...state, newQstn: action.newQstn };
    case types.ADD_QSTN:
      return { ...state, topicsDetails: [...state.topicsDetails, action.qstn] };
    case types.COMMENTS:
      return { ...state, comments: action.comments };
    case types.NEW_CMTS:
      return { ...state, newComment: action.newComment };
    case types.ADD_CMT:
      return { ...state, comments: [...state.comments, action.comment] };
    default:
      return state;
  }
}
