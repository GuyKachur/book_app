import React, { Component } from "react";

import "./App.css";

import Book from "./Book.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Books: []
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    fetch("/api/getBooks")
      .then(res => res.json())
      .then(data => {
        console.log("got data!", data);
        this.setState({
          Books: data
        });
      });
  }

  renderBooks() {
    return this.state.Books.map((c, i) => <Book key={i++} book={c} />);
  }

  postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, cors, *same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      // redirect: "follow", // manual, *follow, error
      // referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses response to JSON
  }

  onCreateBook(event) {
    event.preventDefault();

    if (!this.myInputTitle || !this.myInputAuthor) {
      console.log("fields not set, not inserting");
      return;
    }

    // Post
    console.log("Send the post");
    this.postData("/api/createBook", {
      text: this.myInputTitle.value,
      author: this.myInputAuthor.value,
      rented: false
    }).then(result => {
      console.log("Inserted the data" + result);

      //clearing input
      this.myInputTitle.value = "";
      this.myInputAuthor.value = "";

      // Redraw
      console.log("Reload data");
      this.reloadData();
    });
  }

  render() {
    console.log("Rendering");

    return (
      <div className="App">
        <h1>Books to Rent</h1>

        <div className="row"> {this.renderBooks()} </div>

        <form onSubmit={this.onCreateBook.bind(this)}>
          <div>
            <label htmlFor="inAuthor">
              {" "}
              Author
              <input
                id="inAuthor"
                type="text"
                name="author"
                ref={input => (this.myInputAuthor = input)}
              />
              {/* Remember to add the ref */}
            </label>
          </div>
          <div>
            <label htmlFor="inTitle">
              {" "}
              Title:
              <input
                id="inTitle"
                type="text"
                name="text"
                ref={input => (this.myInputTitle = input)}
              />
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>

        <div>
          Copied from John with my{" "}
          <span role="img" aria-label="eye ball emoji">
            👀
          </span>
        </div>
      </div>
    );
  }
}

export default App;
