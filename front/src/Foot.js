/* eslint-disable no-unused-vars */
import React, {Component} from "react";

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
                <li><a href="/">Browse the Books</a>
                </li>
                <li><a href="/submit">Submit a New Book</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-12">
              <h5></h5>
              <form>
                <div className="form-group">
                  {/*<input className="form-control" type="text"/>*/}
                </div>
                {/*<button type="submit submit-btn" className="btn">Subscribe</button>*/}
              </form>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Foot;
