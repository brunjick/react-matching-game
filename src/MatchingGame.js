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
    if (prevCell.planetID === currCell.planetID) {
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
   * Each cell object has corresponding _planetID_ which indicates which kind of planet
   * is it, a _shown_ flag which indicates if it is overturned or not and also _key_ which is used by React
   * when rendering array of elements.
   */
  generateGameCells() {
    var res = this.uniqueRandomNumbers(5, 5)
      .concat(this.uniqueRandomNumbers(5, 5))
      .map(function(item, index) {
        return {
          shown: false,
          planetID: item,
          key: index
        };
      });

    return res;
  }

  /**
   * Generate _howMany_ unique random numbers in the range of [0, maxValueExcl).
   * Clearly it must hold that: _howMany_<=_maxValueExcl_.
   */
  uniqueRandomNumbers(howMany, maxValueExcl) {
    if (howMany > maxValueExcl) throw new Error('Illegal argument');

    var arr = [];
    while (arr.length < howMany) {
      var randomnumber = Math.floor(Math.random() * maxValueExcl);
      if (arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr;
  }

  render() {
    const {
      MATCHES_LIMIT,
      clickHandler,
      state: { gameCellArray }
    } = this;

    return (
      <div>
        {gameCellArray.map((item, index) => {
          return (
            <Cell
              src={'./assets/images/PLANET_' + item.planetID + '.png'}
              key={index}
              shown={item.shown}
              newline={index + 1 === MATCHES_LIMIT}
              clickHandler={() => clickHandler(index)}
              id={index}
            />
          );
        })}
      </div>
    );
  }
}
