import React, { Component } from "react";
import request from "superagent";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

import Book from "./Book.js";

import MainTemplate from "./MainTemplate.js";

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };

    this.onCreateBook = this.onCreateBook.bind(this);
  }

  foundLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    return { location: { lat: lat, lng: long } };
  }

  noLocation() {
    return { longitude: "", latitude: "" };
  }
  onCreateBook(event) {
    event.preventDefault();
    let body = {
      title: this.myInputTitle.value,
      author: this.myInputAuthor.value,
      description: this.myInputDescription.value,
      bookURL: this.myInputBookURL.value,
      rented: false
    };
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        body.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        request
          .post("/api/createBook")
          .set("Content-Type", "application/json")
          .send(JSON.stringify(body))
          .end((err, res) => {
            console.log(res);
            this.setState({ redirectToReferrer: true });
          });
      },
      err => {
        body.location = {
          lat: "37.108403",
          lng: "-122.337208"
        };
        request
          .post("/api/createBook")
          .set("Content-Type", "application/json")
          .send(JSON.stringify(body))
          .end((err, res) => {
            console.log(res);
            this.setState({ redirectToReferrer: true });
          });
      }
    );
    console.log(body);
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/"} />;
    }
    return (
      <MainTemplate>
        <div className="container">
          <h1 className="text-center">Submit a Book</h1>
          <div className="row justify-content-center">
            <form className="col-md-10" onSubmit={this.onCreateBook.bind(this)}>
              <div className="form-group">
                <label htmlFor="inTitle"> Title:</label>
                <input
                  className="form-control"
                  id="inTitle"
                  type="text"
                  name="title"
                  ref={input => (this.myInputTitle = input)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inAuthor"> Author:</label>
                <input
                  className="form-control"
                  id="inAuthor"
                  type="text"
                  name="author"
                  ref={input => (this.myInputAuthor = input)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inDescription"> Description:</label>
                <input
                  className="form-control"
                  id="inDescription"
                  type="text"
                  name="description"
                  ref={input => (this.myInputDescription = input)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inBookURL"> Book Image URL:</label>
                <input
                  className="form-control"
                  id="inBookURL"
                  type="text"
                  name="bookURL"
                  ref={input => (this.myInputBookURL = input)}
                />
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <Route exact path="/" component={Book} />
      </MainTemplate>
    );
  }
}
