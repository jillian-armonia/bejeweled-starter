const Bejeweled = require("./bejeweled");
const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

    this.swapMode = false;
    this.selected = {};
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    if (this.swapMode && this.col === this.selected.col){
      if (this.row >= this.selected.col && this.col <= this.selected.col + 1 && this.row > 0){
        this.row--;
      }
    } else if (!this.swapMode){
      if (this.row > 0 && this.row < this.numRows){
        this.row--;
      }
    }

  }

  down() {
    if (this.swapMode && this.col === this.selected.col){
      if(this.row >= this.selected.row - 1 && this.row <= this.selected.row && this.row < this.numRows - 1){
        this.row++;
      }
    } else if (!this.swapMode){
      if (this.row >= 0 && this.row < this.numRows - 1){
        this.row++;
      }
    }



  }

  left() {
    if (this.swapMode && this.row === this.selected.row){
      if (this.col >= this.selected.col && this.col <= this.selected.col + 1 && this.col > 0){
        this.col--;
      }
    } else if (!this.swapMode) {
      if (this.col > 0 && this.col < this.numCols){
        this.col--;
      }
    }



  }

  right() {
    if (this.swapMode && this.row === this.selected.row){
      if (this.col >= this.selected.col - 1 && this.col <= this.selected.col && this.col < this.numCols - 1){
        this.col++;
      }
    } else if (!this.swapMode){
      if(this.col >= 0 && this.col < this.numCols - 1){
        this.col++;
      }
    }



  }

  select(){
    this.swapMode = true;
    this.selected.row = this.row;
    this.selected.col = this.col;
  }

  swap(grid){
    let selectedFruit = grid[this.selected.row][this.selected.col];
    let swappingFruit = grid[this.row][this.col];

    grid[this.selected.row][this.selected.col] = swappingFruit;
    grid[this.row][this.col] = selectedFruit;

    if (Bejeweled.checkForMatches(grid)){
      this.swapMode = false;
    } else {
      grid[this.selected.row][this.selected.col] = selectedFruit;
      grid[this.row][this.col] = swappingFruit;
    }
  }

}


module.exports = Cursor;
