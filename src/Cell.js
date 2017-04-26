import React, { Component } from 'react';

/**
 * Represents a single cell in the game.
 *
 * @prop {string}   src           - URL of the image.
 * @prop {boolean}  shown         - Indicates if cell is flipped or not.
 * @prop {boolean}  newline       - indicates if new line should be inserted after cell or not.
 * @prop {function} clickHandler  - function which should handle clicks on this cell.
 * @prop {number}   id            - index where cell is located on the UI, ranges from [0...9].
 */
export default class Cell extends Component {
  render() {
    const DEFAULT_BG = './assets/images/BG.jpg';

    return (
      <span style={{ margin: '.2em' }}>
        <img
          id={this.props.id}
          src={this.props.shown ? this.props.src : DEFAULT_BG}
          style={{ width: 200, height: 200 }}
          onClick={this.props.clickHandler}
          alt=""
        />
        {this.props.newline ? <br /> : null}
      </span>
    );
  }
}
