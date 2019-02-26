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

    console.log("test");
    if (!this.myInputTitle || !this.myInputAuthor || !this.myInputDescription) {
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
        title:this.myInputTitle.value,
        author: this.myInputAuthor.value,
        description: this.myInputDescription.value,
        bookURL: this.myInputBookURL.value,
        rented: false
      }) 
    }).then(response => response.json())
      .then(result => {
        console.log("Inserted the data" + result);

        //clearing input
        this.myInputTitle.value = "";
        this.myInputAuthor.value = "";
        this.myInputDescription.value = "";
        this.myInputBookURL.value = "";


        // Redraw
        console.log("Reload data");
        this.reloadData();
      });
  }

  render() {
    console.log("Rendering");

    return (
      <div className="App">
        <div className="container">
          <h1 className="text-center">Books to Rent</h1>

          <div className="bookContainer row justify-content-center"> {this.renderBooks()} </div>

          <form onSubmit={this.onCreateBook.bind(this)}>
            
            <div className="row text-center">
              <div className="col-lg-4">
                <label htmlFor="inTitle">
                  {" "}
                  Title:
                  <input
                    id="inTitle"
                    type="text"
                    name="title"
                    ref={input => (this.myInputTitle = input)}
                  />
                </label>
              </div>
            
              <div className="row">
                <label htmlFor="inAuthor">
                  {" "}
                  Author:
                  <input
                    id="inAuthor"
                    type="text"
                    name="author"
                    ref={input => (this.myInputAuthor = input)}
                  />
                  {/* Remember to add the ref */}
                </label>
              </div>
              <div className="row">
                <label htmlFor="inDescription">
                  {" "}
                  Description:
                  <input
                    id="inDescription"
                    type="text"
                    name="description"
                    ref={input => (this.myInputDescription = input)}
                  />
                  {/* Remember to add the ref */}
                </label>
              </div>
              <div className="row">
                <label htmlFor="inBookURL">
                  {" "}
                  Book Image URL:
                  <input
                    id="inBookURL"
                    type="text"
                    name="bookURL"
                    ref={input => (this.myInputBookURL = input)}
                  />
                  {/* Remember to add the ref */}
                </label>
              </div>

              <input type="submit" value="Submit" />
            </div>
          </form>

          <div>
            By Neil and Guy{" "}
            <span role="img" aria-label="eye ball emoji">
              👀
            </span>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
