import React from "react";
import BookMap from "./BookMap.js";

export default class BookMapContainer extends React.Component {
  state = {
    books: this.props.books,
    location: this.props.location,
    activeMarker: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({
        books: nextProps.books,
        location: nextProps.location
      });
    }
  }

  closeOtherMarkers = uid => {
    this.setState({ activeMarker: uid });
  };

  toggleShowPage() {
    alert("Book Rented!");
  }

  render() {
    return (
      <BookMap
        books={this.props.books}
        location={this.props.location}
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnAAq2EJ8xiHsTmyUu3D2Ba_OWO8DoUEE&v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: `600px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        toggleShowPage={this.toggleShowPage}
        activeMarker={this.state.activeMarker}
        closeOtherMarkers={this.closeOtherMarkers}
      />
    );
  }
}
//okay toggle show pages needs to be passed one
