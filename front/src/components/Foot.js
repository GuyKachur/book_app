/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Submission from "./Submission.js";
import { Link } from "react-router-dom";

class Foot extends Component {
  render() {
    return (
      <footer className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <h5>About</h5>
              <p>Online Repository of Local Books</p>
            </div>
            <div className="col-lg-4 col-sm-6">
              <h5>Books</h5>
              <ul>
                <li>
                  <Link to="/">Browse the Books</Link>
                </li>
                <li>
                  <Link to="/submit">Submit a New Book</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-12">
              <h5 />
              <form>
                <div className="form-group" />
              </form>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Foot;
