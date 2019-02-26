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
      
      <div className="Book card col-md-4 col-lg-3">
        <div className="cardImageBox">
          <img className="card-img-top cardImage" src={this.props.book.bookURL} alt="Card image"/>
        </div>
        <div className="card-body align-self-baseline">
          <h4 className="card-title">{this.props.book.title}</h4>
          <h5>{this.props.book.author}</h5>
          <p>{this.props.book.description}</p>
          {/*<span>{"Rented: " + this.state.rented}</span>*/}
          <button onClick={this.rentChange.bind(this)} className="btn btn-primary">
            Rent Me
          </button>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
};
