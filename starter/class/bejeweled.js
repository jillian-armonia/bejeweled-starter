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

    if (grid.length === 1){
      Bejeweled.putFruits(grid);
    }

    for(let rowNum = 0; rowNum < grid.length - 1; rowNum++){
      for (let colNum = 0; colNum < grid[rowNum].length; colNum++){
        let fruit = grid[rowNum][colNum];
        let fruitBelow = grid[rowNum + 1][colNum];

        if (fruit !== ' ' && fruitBelow === ' '){
          grid[rowNum + 1][colNum] = fruit;
          grid[rowNum][colNum] = fruitBelow;
        };

        Bejeweled.shiftFruits(grid.slice(0, grid.length - 1));
      }
    }


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

  static validMoves(grid){
    const findFruitH = (fruit, row, col) => {
      let before = col - 1;
      let before2 = col - 2;
      let after = col + 2;
      let after2 = col + 3
      let top = row - 1;
      let bottom = row + 1;

      if (before >= 0 && bottom <= grid.length - 1){
        return grid[bottom][before] === fruit;
      } else if (before >= 0 && top >= 0){
        return grid[top][before] === fruit;
      }

      if (after < grid[row].length && bottom <= grid.length - 1){
        return grid[bottom][after] === fruit;
      } else if (after < grid[row].length && top >= 0){
        return grid[top][after] === fruit;
      }

      if (before2 >= 0){
        return grid[row][before2] === fruit;
      } else if (after2 < grid[row].length){
        return grid[row][after2] === fruit;
      }

    }

    const findFruitV = (fruit, row, col) => {
      let before = col - 1;
      let after = col + 2;
      let top = row - 1;
      let top2 = row - 2;
      let bottom = row + 1;
      let bottom2 = row + 2;

      if (top2 >= 0){
        return grid[top2][col] === fruit;
      } else if (bottom2 < grid.length){
        return grid[bottom2][col] === fruit;
      }

      if(top >= 0 && before >= 0){
        return grid[top][before] === fruit;
      } else if (top >= 0 && after < grid[row].length){
        return grid[top][after] === fruit;
      }

      if (bottom < grid.length && before >= 0){
        return grid[bottom][before] === fruit;
      } else if(bottom < grid.length && after < grid[row].length){
        return grid[bottom][after] === fruit;
      }
    }
    //Check for potential horizontal matches
    for(let rowNum = 0; rowNum < grid.length; rowNum++){
      for(let colNum = 0; colNum < grid[rowNum].length - 1; colNum++){
        let fruit = grid[rowNum][colNum];
        let fruit2 = grid[rowNum][colNum + 1];

      if (fruit === fruit2){
        if (findFruitH(fruit, rowNum, colNum)){
          return true;
        }
      }
      }
    }

      //2. Check if there is the same fruit one space away from each other and checking if the row above and beneath the middle fruit is the same fruit
      for(let rowNum = 0; rowNum < grid.length; rowNum++){
        for(let colNum = 0; colNum < grid[rowNum].length - 2; colNum++){
          let fruit = grid[rowNum][colNum];
          let fruit2 = grid[rowNum][colNum + 2];

        if (fruit === fruit2){
          let top = rowNum - 1;
          let bottom = rowNum + 1;

          if (top >= 0 && grid[top][colNum + 1] === fruit){
            return true;
          } else if (bottom < grid.length && grid[bottom][colNum + 1] === fruit){
            return true;
          }
        }
        }
      }

    //Check for potential vertical matches
      //1. Checking for pairs and checking if the same fruit is one space away from the pair
      for (let rowNum = 0; rowNum < grid.length - 1; rowNum++){
        for (let colNum = 0; colNum < grid[rowNum].length; colNum++){
          let fruit = grid[rowNum][colNum];
          let fruit2 = grid[rowNum + 1][colNum];

          if (fruit === fruit2){
            if (findFruitV) {
              return true;
            }
          }
        }
      }
      //2. Check if there is the same fruit one space away from each other and checking if the columns beside the middle fruit is the same fruit
      for(let rowNum = 0; rowNum < grid.length - 2; rowNum++){
        for(let colNum = 0; colNum < grid[rowNum].length; colNum++){
          let fruit = grid[rowNum][colNum];
          let fruit2 = grid[rowNum + 2][colNum];

          if (fruit === fruit2){
            let before = colNum - 1;
            let after = colNum + 1;
            let between = rowNum + 1;

            if (before >= 0 && grid[between][before] === fruit){
              return true;
            } else if (after < grid[rowNum].length && grid[between][after] === fruit){
              return true;
            }
          }
        }
      }

      return false;
  }

}



module.exports = Bejeweled;
