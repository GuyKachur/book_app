import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rented: false
    };
  }

  rentChange() {
    this.setState({ rented: !this.state.rented });
  }

  decideButtonClass() {
    var isRentedString = "btn-success";
    if (this.state.rented) {
      isRentedString = "btn-danger";
    }
    return "btn " + isRentedString;
  }

  render() {
    return (
      <div className="Book col-5">
        <button
          className={this.decideButtonClass}
          onClick={this.rentChange.bind(this)}
        >
          <span role="img" aria-label="rent_book">
            📖
          </span>
        </button>
        &nbsp;&nbsp;
        <span>{"Rented " + this.state.rented}</span>
        &nbsp;&nbsp;
        <span>{"Book Title: " + this.props.book.title}</span>
        &nbsp;&nbsp;
        <span>{"Author: " + this.props.book.author}</span>
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  rented: Boolean
};
