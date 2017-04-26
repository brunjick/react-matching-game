import React, { Component } from 'react';
import Cell from './Cell';

/**
 * This is our actual game component which represents the matching game.
 * It uses a Cell class to draw individual cells of planets on the screen.
 */
export default class MatchingGame extends Component {
  constructor(props) {
    super(props);

    this.MATCHES_LIMIT = 5;

    this.clickHandler = this.clickHandler.bind(this);
    this.state = this.freshState();
  }

  freshState() {
    return {
      matches: 0,
      inProcess: false,
      prevCellIndex: -1,
      gameCellArray: this.generateGameCells()
    };
  }

  /**
   * This gets called when a user clicks on any of the planet boxes.
   */
  clickHandler(index) {
    // Get references to current and previous cells
    const currCell = this.state.gameCellArray[index];
    const prevCell = this.state.gameCellArray[this.state.prevCellIndex];

    // Ignore click if already shown cell was clicked,
    // or game is inProcess state
    if (currCell.shown || this.state.inProcess) {
      return;
    }

    // Open current cell
    currCell.shown = true;

    // If cell wasn't opened previously, set current as previos and return
    if (!prevCell) {
      this.setState({ prevCellIndex: index });
      return;
    }

    // If cells match, keep both in shown state,
    // otherwise hide them after 1 second
    if (prevCell.planetId === currCell.planetId) {
      // Increment matches count
      const matches = this.state.matches + 1;

      // Check if all cells are matched and start new game,
      // otherwise set correct state
      if (matches === this.MATCHES_LIMIT) {
        alert('Game finished');
        this.setState(this.freshState);
      } else {
        this.setState({
          matches: matches,
          prevCellIndex: -1
        });
      }
    } else {
      this.setState({ inProcess: true });

      setTimeout(() => {
        prevCell.shown = false;
        currCell.shown = false;

        this.setState({
          inProcess: false,
          prevCellIndex: -1
        });
      }, 1000);
    }
  }

  /**
   * Generate array of game cell objects.
   */
  generateGameCells() {
    let planetIdsArray = [];

    // Create initial planet ids' array
    // [0, 0, 1, 1, 2, 2...]
    for (let i = 0; i < this.MATCHES_LIMIT; i++) {
      planetIdsArray.push(i);
      planetIdsArray.push(i);
    }

    // Shuffle planet ids
    let planetIdsShuffled = this.shuffleArray(planetIdsArray);

    // Return array of game cells
    return planetIdsShuffled.map(id => ({
      shown: false,
      planetId: id
    }));
  }

  /**
   * Shuffle array randomly.
   */
  shuffleArray(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  render() {
    const { MATCHES_LIMIT, clickHandler, state: { gameCellArray } } = this;

    return (
      <div>
        {gameCellArray.map((item, index) => {
          return (
            <Cell
              src={'./assets/images/PLANET_' + item.planetId + '.png'}
              key={index}
              shown={item.shown}
              newline={(index + 1) === MATCHES_LIMIT}
              clickHandler={() => clickHandler(index)}
              id={index}
            />
          );
        })}
      </div>
    );
  }
}
