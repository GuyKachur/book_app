import React, { Component } from "react";

import "./App.css";

import MainTemplate from "./MainTemplate.js";
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

  render() {
    console.log("Rendering");

    return (
      <MainTemplate>
        <div className="App">
          <div className="container">
            <h1 className="text-center">Books to Rent</h1>

            <div className="bookContainer row justify-content-center"> {this.renderBooks()} </div>

            {/*<Submission/>*/}
            
            {/*<div className="submissionContainer row justify-content-center"> {this.renderSubmission()} </div>*/}

          </div>
        </div>
      </MainTemplate>
    );
  }
}

export default App;
