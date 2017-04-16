import React, { Component } from "react";

/*
 * Represents a single cell in the game.
 *
 * props
 *  src: URL of image.
 *  shown: indicates if cell is flipped or not.
 *  newline: indicates if new line should be inserted after cell or not.
 *  clickHandler: function which should handle clicks on this cell.
 *  id: index where cell is located on the UI, ranges from [0,..,9].
 */
class Cell extends Component {
  render() {
    var element = (
      <img
        id={this.props.id}
        onClick={this.props.clickHandler}
        src={this.props.src}
        style={{ width: 200, height: 200 }}
        alt=""
      />
    );

    /* If the Cell is not flipped, show the background image of the cell.*/
    if (!this.props.shown)
      element = (
        <img
          id={this.props.id}
          onClick={this.props.clickHandler}
          src="./assets/images/1.jpg"
          style={{ width: 200, height: 200 }}
          alt=""
        />
      );

    return (
      <span style={{ padding: 2 }}>
        {element}
        {this.props.newline ? <br /> : ""}
      </span>
    );
  }
}

export default Cell;
