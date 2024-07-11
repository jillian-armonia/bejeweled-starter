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

  setSwapColor(){
    if (this.selected.row + 1 < this.numRows){
      Screen.setBackgroundColor(this.selected.row + 1, this.selected.col, this.gridColor);
    }

    if (this.selected.row - 1 >= 0){
      Screen.setBackgroundColor(this.selected.row - 1, this.selected.col, this.gridColor);
    }

    if (this.selected.col + 1 < this.numCols){
      Screen.setBackgroundColor(this.selected.row, this.selected.col + 1, this.gridColor);
    }

    if (this.selected.col - 1 >= 0){
      Screen.setBackgroundColor(this.selected.row, this.selected.col - 1, this.gridColor);
    }

  }

  up() {
    this.resetBackgroundColor();

    if (this.swapMode && this.col === this.selected.col){
      if (this.row >= this.selected.row && this.row <= this.selected.row + 1 && this.row > 0){
        this.row--;
      }
    } else if (!this.swapMode){
      if (this.row > 0 && this.row < this.numRows){
        this.row--;
      }
    }

    this.setBackgroundColor();
    Screen.render();
  }

  down() {
    this.resetBackgroundColor();
    if (this.swapMode && this.col === this.selected.col){
      if(this.row >= this.selected.row - 1 && this.row <= this.selected.row && this.row < this.numRows - 1){
        this.row++;
      }
    } else if (!this.swapMode){
      if (this.row >= 0 && this.row < this.numRows - 1){
        this.row++;
      }
    }

    this.setBackgroundColor();
    Screen.render();
  }

  left() {
    this.resetBackgroundColor();

    if (this.swapMode && this.row === this.selected.row){
      if (this.col >= this.selected.col && this.col <= this.selected.col + 1 && this.col > 0){
        this.col--;
      }
    } else if (!this.swapMode) {
      if (this.col > 0 && this.col < this.numCols){
        this.col--;
      }
    }

    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    this.resetBackgroundColor();

    if (this.swapMode && this.row === this.selected.row){
      if (this.col >= this.selected.col - 1 && this.col <= this.selected.col && this.col < this.numCols - 1){
        this.col++;
      }
    } else if (!this.swapMode){
      if(this.col >= 0 && this.col < this.numCols - 1){
        this.col++;
      }
    }

    this.setBackgroundColor();
    Screen.render();
  }

  select(){
    if (!this.swapMode){
      this.swapMode = true;
      this.selected.row = this.row;
      this.selected.col = this.col;

      this.cursorColor = "magenta";
      this.gridColor = "cyan";

      this.setSwapColor();

      this.setBackgroundColor();
      Screen.render();
    }

  }

  swap(grid){
    if (this.swapMode){
      let selectedFruit = grid[this.selected.row][this.selected.col];
    let swappingFruit = grid[this.row][this.col];

    grid[this.selected.row][this.selected.col] = swappingFruit;
    grid[this.row][this.col] = selectedFruit;

    Screen.setGrid(this.selected.row, this.selected.col, swappingFruit);
    Screen.setGrid(this.row, this.col, selectedFruit);
    Screen.render();
  }

}


}


module.exports = Cursor;
