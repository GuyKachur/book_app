import React, { Component } from "react";
import MainTemplate from "./MainTemplate.js";
import App from "./App.js";


// import PropTypes from "prop-types";

export default class Submission extends Component {

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
    return (
      <MainTemplate>
        <div className="">
          <h1 className="text-center">Submit a Book</h1>
          <div className="card">
            
            <div className="row text-center">
              <form onSubmit={this.onCreateBook.bind(this)}>

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
              </form>
            </div>
          </div>
        </div>
      </MainTemplate>
    );
  }
}

// Submission.propTypes = {
//   submission: PropTypes.object.isRequired
// };
