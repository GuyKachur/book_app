import React, { Component } from "react";

import MainTemplate from "./MainTemplate.js";

export default class AboutPage extends Component {
  render() {
    return (
      <MainTemplate>
        <div className="container">
          <h1>About Book Lender</h1>
          <p>
            Go walk around your neighboorhood, did you find one of those cool
            book drops, thats full of books that people have left, sort of give
            a book, take a book vibe? We want to update that to the modern era.
          </p>
          <p>
            First we want you to be able to lend out books of yours that you
            like, keeping ownership, but allowing your local community to read
            and enjoy. Eventually we would like to create a place that people
            can go for all things books
          </p>
        </div>
      </MainTemplate>
    );
  }
}
