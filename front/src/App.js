import React, { Component } from "react";

import "./App.css";

import Book from "./Book.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
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
          books: data
        });
      });
  }

  renderBooks() {
    return this.state.books.map((c, i) => <Book key={i++} book={c} />);
  }

  onCreateBook(event) {
    event.preventDefault();

    if (!this.myInputTitle || !this.myInputAuthor) {
      console.log("fields not set, not inserting");
      return;
    }

    // Post
    console.log("Send the post");
    fetch("/api/createBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text:this.myInputAuthor.value,
        author: this.myInputAuthor.value,
        rented: false
      }) 
    }).then(response => response.json())
      .then(result => {
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
