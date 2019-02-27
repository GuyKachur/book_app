import React, { Component } from "react";

import MainTemplate from "./MainTemplate.js";

export default class AboutPage extends Component {
  render() {
    return (
      <MainTemplate>
        <div className="container">
          <h1>About Book Trader</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ab nostrum incidunt molestiae eum. Fuga rerum, quibusdam. Excepturi inventore ad autem, asperiores repudiandae placeat, quas, quibusdam id, a cupiditate sequi?</p>
        </div>
      </MainTemplate>
    );
  }
}
