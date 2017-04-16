import React, { Component } from "react";
import Cell from "./Cell";

/*
 * It uses a Cell class (defined below) to draw individual cells of planets on the screen.
 * This is our actual game component which represents the matching game.
 */
class MatchingGame extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.previouslyShownCardIndex = -1;
    this.matches = 0;
    this.MATCHES_LIMIT = 5;

    /* Planet URLS */
    this.planetURLS = [
      "124555.png",
      "124558.png",
      "124559.png",
      "124560.png",
      "124582.png"
    ];

    /* Our state */
    this.state = {
      gameCellArray: this.generateGameCells()
    };
  }

  /*
   * This gets called when a user clicks any of the planet boxes.
   */
  clickHandler(event) {
    var that = this;

    var cellIndex = event.target.id;

    that.setState(function(prevState, props) {
      /* Temporarily clone state */
      var cloneState = JSON.parse(JSON.stringify(prevState));

      /* Get reference to currently clicked cell */
      var currentCell = cloneState.gameCellArray[cellIndex];

      if (
        currentCell.shown ||
        that.inProcess ||
        that.matches === that.MATCHES_LIMIT
      )
        return;

      /* Open up current cell */
      currentCell.shown = true;

      /*
       * Was there a cell already open?
       */
      if (that.previouslyShownCardIndex !== -1) {
        /* Yes, there was - get reference to already opened cell */
        var previousCell =
          cloneState.gameCellArray[that.previouslyShownCardIndex];

        /* compare planet ID of currently opened cell with planet ID of previously shown cell */
        if (currentCell.planetID !== previousCell.planetID) {
          /*
           * We have a mismatch. Close both cards.
           */
          that.inProcess = true;
          setTimeout(function() {
            currentCell.shown = false;
            previousCell.shown = false;
            that.setState(cloneState);
            that.inProcess = false;
          }, 1000);
        } else {
          /* There is a match. Increase number of matches. */
          if (++that.matches === that.MATCHES_LIMIT) {
            setTimeout(function() {
              alert("Game finished");
            }, 500);
          }
        }

        /* In both cases, if there was a match or no, we don't need currently to keep track of already opened cell */
        that.previouslyShownCardIndex = -1;
      } else {
        /*
         * There was no card shown previously.
         * So just store index of current card.
         */
        that.previouslyShownCardIndex = cellIndex;
      }

      return cloneState;
    });
  }

  /*
   * Generate array of game cell objects.
   * Each cell object has corresponding _planetID_ which indicates which kind of planet
   * is it, a _shown_ flag which indicates if it is overturned or not and also _key_ which is used by React
   * when rendering array of elements.
   *
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

  /*
   * Generate _howMany_ unique random numbers in the range of [0, maxValueExcl).
   * Clearly it must hold that: _howMany_<=_maxValueExcl_.
   */
  uniqueRandomNumbers(howMany, maxValueExcl) {
    if (howMany > maxValueExcl) throw new Error("Illegal argument");

    var arr = [];
    while (arr.length < howMany) {
      var randomnumber = Math.floor(Math.random() * maxValueExcl);
      if (arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr;
  }

  render() {
    const { state, planetURLS, clickHandler } = this;

    return (
      <div>
        {state.gameCellArray.map((item, index) => {
          return (
            <Cell
              src={"./assets/images/" + planetURLS[item.planetID]}
              key={item.key}
              shown={item.shown}
              newline={index === 4}
              id={index}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default MatchingGame;
