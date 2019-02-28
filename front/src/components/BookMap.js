import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow
} from "react-google-maps";
import BookMarker from "./BookMarker.js";

const BookMap = withScriptjs(
  withGoogleMap(props => {
    const markers = props.books.map(book => {
      let marker = (
        <BookMarker
          title={book.title}
          author={book.author}
          BookUrl={book.BookUrl}
          location={book.location}
          activeMarker={book.key === props.activeMarker ? true : false}
          key={book.key}
          closeMarkers={props.closeOtherMarkers}
          toggleShowPage={props.toggleShowPage}
          book={book}
        >
          <InfoWindow visible={true}>
            <h1>{"Guy"}</h1>
          </InfoWindow>
        </BookMarker>
      );
      return marker;
    });

    return (
      <GoogleMap defaultZoom={12} center={props.location}>
        {markers}
      </GoogleMap>
    );
  })
);
export default BookMap;
