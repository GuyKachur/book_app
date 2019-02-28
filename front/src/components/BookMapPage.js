import React from "react";

import MainTemplate from "./MainTemplate.js";
import BookMapContainer from "./BookMapContainer.js";
import App from "./App";

export default class BookMapPage extends App {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      err => {
        this.setState({
          location: {
            lat: 37.108403,
            lng: -122.337208
          }
        });
      }
    );
    this.reloadData();
  }

  render() {
    console.log(this.state.books);
    return (
      <MainTemplate>
        <div className="container">
          <h1>Book Map</h1>
          <BookMapContainer
            books={this.state.books}
            location={this.state.location}
          />
        </div>
      </MainTemplate>
    );
  }
}
