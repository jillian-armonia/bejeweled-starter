const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = [];

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  static comboCounter = 0;

  static checkForMatches(grid) {
    const checkHorizontal = (matchNum) => {
      let endNum = matchNum - 1;

      for(let rowNum = grid.length - 1; rowNum >= 0; rowNum--){
        for (let colNum = 0; colNum < grid[rowNum].length - endNum; colNum++){
          let fruit = grid[rowNum][colNum];
          let fruit2 = grid[rowNum][colNum + 1];
          let fruit3 = grid[rowNum][colNum + 2];
          let fruit4;
          let fruit5;

          if (matchNum === 5){
            fruit5 = grid[rowNum][colNum + 4];
          }

          if (matchNum >= 4){
            fruit4 = grid[rowNum][colNum + 3];
          }

          if (matchNum === 5 && fruit === fruit2 && fruit === fruit3 && fruit === fruit4 && fruit === fruit5){
            return [{row: rowNum, col: colNum}, {row: rowNum, col: colNum + 1}, {row: rowNum, col: colNum + 2}, {row: rowNum, col: colNum + 3}, {row: rowNum, col: colNum + 4}];
          } else if (matchNum === 4 && fruit === fruit2 && fruit === fruit3 && fruit === fruit4){
            return [{row: rowNum, col: colNum}, {row: rowNum, col: colNum + 1}, {row: rowNum, col: colNum + 2}, {row: rowNum, col: colNum + 3}];
          } else if (matchNum === 3 && fruit === fruit2 && fruit === fruit3) {
            return [{row: rowNum, col: colNum}, {row: rowNum, col: colNum + 1}, {row: rowNum, col: colNum + 2}];
          }
        }
      };

      return false;
    }


    if (checkHorizontal(5)){
      return checkHorizontal(5);
    } else if (checkHorizontal(4)){
      return checkHorizontal(4);
    } else if (checkHorizontal(3)){
      return checkHorizontal(3);
    }

    const checkVertical = (matchNum) => {
      let endNum = matchNum - 1;

      for(let rowNum = 0; rowNum < grid.length - endNum; rowNum++){
        for(let colNum = 0; colNum < grid[rowNum].length; colNum++){
          let fruit = grid[rowNum][colNum];
          let fruit2 = grid[rowNum + 1][colNum];
          let fruit3 = grid[rowNum + 2][colNum];
          let fruit4;
          let fruit5;

          if (matchNum === 5){
            fruit5 = grid[rowNum + 4][colNum];
          }

          if (matchNum >= 4){
            fruit4 = grid[rowNum + 3][colNum];
          }

          if (matchNum === 5 && fruit === fruit2 && fruit === fruit3 && fruit === fruit4 && fruit === fruit5) {
            return [{row: rowNum, col: colNum}, {row: rowNum + 1, col: colNum}, {row: rowNum + 2, col: colNum}, {row: rowNum + 3, col: colNum}, {row: rowNum + 4, col: colNum}];
          } else if (matchNum === 4 && fruit === fruit2 && fruit === fruit3 && fruit === fruit4) {
            return [{row: rowNum, col: colNum}, {row: rowNum + 1, col: colNum}, {row: rowNum + 2, col: colNum}, {row: rowNum + 3, col: colNum}];
          } else if (matchNum === 3 && fruit === fruit2 && fruit === fruit3){
            return [{row: rowNum, col: colNum}, {row: rowNum + 1, col: colNum}, {row: rowNum + 2, col: colNum}];
          }
        }
      }

      return false;
    }

    if (checkVertical(5)){
      return checkVertical(5);
    } else if (checkVertical(4)){
      return checkVertical(4);
    } else if (checkVertical(3)){
      return checkVertical(3);
    }

    //2. If there are no matches, return false
    return false;
  }

  static putFruits(grid){
    const fruits = ['🥥', '🥝', '🍇', '🍋', '🍊', '🍓'];

    for (let rowNum = grid.length - 1; rowNum >= 0; rowNum--){
      for(let colNum = 0; colNum < grid[rowNum].length; colNum++){
        if (grid[rowNum][colNum] === ' '){
          let random = Math.floor(Math.random() * fruits.length);
          let randomFruit = fruits[random];

          grid[rowNum][colNum] = randomFruit;
          Screen.setGrid(rowNum, colNum, randomFruit);
        }
      }
    }

    return;
  }

  static deleteFruits(grid){
    let match = Bejeweled.checkForMatches(grid);

    if (match !== false){
      match.forEach(fruit => {
        grid[fruit.row][fruit.col] = ' ';
      })
    } else return;
  }

  static shiftFruits(grid){
    let match = Bejeweled.checkForMatches(grid);

    for(let rowNum = 0; rowNum < grid.length - 1; rowNum++){
      for (let colNum = 0; colNum < grid[rowNum].length; colNum++){
        let fruit = grid[rowNum][colNum];
        let fruitBelow = grid[rowNum + 1][colNum];

        if (fruit !== ' ' && fruitBelow === ' '){
          grid[rowNum + 1][colNum] = fruit;
          grid[rowNum][colNum] = fruitBelow;
        }
      }
    }

    Bejeweled.putFruits(grid);

    if (match !== false){
      Bejeweled.comboCounter++;
      Bejeweled.deleteFruits(grid);
      Bejeweled.shiftFruits(grid);
    } else {
      Bejeweled.comboCounter = 0;
    }
  }

  static getCombo(){
    return Bejeweled.comboCounter;
  }

}



module.exports = Bejeweled;
