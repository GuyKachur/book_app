import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuBar from "./MenuBar.js";
import Foot from "./Foot.js";


export default class MainTemplate extends Component {
  render() {
    return (
      <div>
        <MenuBar />

        {this.props.children}

        <Foot />
      </div>
    );
  }
}


MainTemplate.propTypes = {
  children:  PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};