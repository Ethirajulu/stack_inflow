import React, { Component } from "react";
import PropTypes from "prop-types";

class DelButton extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.handleDelete(this.props.id, this.props.text);
  }

  render() {
    return (
      <button
        type="button"
        className={`btn btn-sm btn-secondary float-right ${
          this.props.className
        }`}
        onClick={this.handleDelete}
      >
        Delete
      </button>
    );
  }
}

DelButton.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number,
  className: PropTypes.string,
  handleDelete: PropTypes.func
};

export default DelButton;
