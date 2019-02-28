import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import BookIcon from "../public/book.ico";
import BookMapCard from "./BookMapCard";

export default class BookMarker extends React.Component {
  state = {
    isOpen: false,
    activeMarker: this.props.activeMarker
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({ activeMarker: false }, () => {
          this.props.closeMarkers(null);
        });
      } else {
        this.props.closeMarkers(this.props.uid);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ activeMarker: nextProps.activeMarker });
  }

  render() {
    return (
      <div>
        <Marker
          title={this.props.title}
          onClick={this.toggleOpen}
          position={this.props.location}
          icon={BookIcon}
        >
          {this.state.isOpen && this.state.activeMarker ? (
            <InfoWindow
              maxWidth={800}
              defaultPosition={this.props.location}
              onCloseClick={this.props.onToggleOpen}
            >
              <BookMapCard toggleShowPage={this.props} book={this.props.book} />
            </InfoWindow>
          ) : null}
        </Marker>
      </div>
    );
  }
}
