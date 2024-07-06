const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
const { it } = require('mocha');

describe ('Bejeweled', function () {

  let grid;

  // Add tests for setting up a basic board

  describe('Basic Board Tests', function(){
    //1. Fill up the 8x8 grid with different fruit emojis randomly
    it('should have an 8x8 grid filled with random fruits and no matches', function(){

      grid = [['🥥', '🥝', '🍇', '🍋', '🍊', '🥥', '🍊', '🍊'],
              ['🥝', '🥥', '🍋', '🍇', '🍊', '🍓', '🍇', '🥥'],
              ['🍊', '🥝', '🥥', '🍇', '🍇', '🥥', '🥥', '🍊'],
              ['🍋', '🍊', '🥝', '🥥', '🍇', '🥥', '🍇', '🍋'],
              ['🍓', '🍋', '🍊', '🥝', '🥥', '🍓', '🍋', '🍊'],
              ['🍓', '🍓', '🍋', '🍊', '🥝', '🥥', '🥝', '🥝'],
              ['🍇', '🍇', '🍓', '🍋', '🍊', '🍓', '🥥', '🍊'],
              ['🍋', '🍓', '🍇', '🍓', '🍋', '🍓', '🍋', '🥥']]

      expect(Bejeweled.checkForMatches(grid)).to.be.false;
  });


    it('should not have blank spaces', function(){

      grid = [[' ', '🍋', '🍊'],
              ['🥥', '🍋', '🍊']]

      Bejeweled.putFruits(grid);
      expect(grid[0][0]).to.not.equal(' ');
    })
  });


  // Add tests for a valid swap that matches 3 fruits
    //If there is a 3-item combo, checkForMatches(grid) should return true
    describe('3-Match Tests', function(){

      it('should recognize a horizontal match', function(){

        grid = [['🥥', '🍋', '🍊'],
                ['🍓', '🍓', '🍓']]

        expect(Bejeweled.checkForMatches(grid)).to.be.true;
        Bejeweled.deleteFruits(grid);
        expect([grid[1][0], grid[1][1], grid[1][2]]).to.be.equal([' ', ' ', ' ']);

      });

      it('should recognize a vertical match', function(){

        grid = [['🍓', '🍊', '🍊'],
                ['🥥', '🍇', '🥥'],
                ['🥥', '🥥', '🍊'],
                ['🥥', '🍇', '🍋']]

        expect(Bejeweled.checkForMatches(grid)).to.be.true;
        Bejeweled.deleteFruits(grid);
        expect([grid[1][0], grid[2][0], grid[3][0]]).to.be.equal([' ', ' ', ' ']);

      })
    })

  describe('4 and 5 Match Tests', function(){

    it('should recognize a 4 horizontal match', function(){

      grid = [['🥥', '🍋', '🍊', '🍇'],
              ['🍓', '🍓', '🍓', '🍓']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[1][1], grid[1][2], grid[1][3]]).to.be.equal([' ', ' ', ' ', ' ']);

    });

    it('should recognize a 5 horizontal match', function(){

      grid = [['🥥', '🍋', '🍊', '🍇', '🥥'],
              ['🍓', '🍓', '🍓', '🍓', '🍓']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[1][1], grid[1][2], grid[1][3], grid[1][4]]).to.be.equal([' ', ' ', ' ', ' ', ' ']);

    });

    it('should recognize a 4 vertical match', function(){

      grid = [['🍓', '🍊', '🍊'],
              ['🥥', '🍇', '🥥'],
              ['🥥', '🍊', '🍊'],
              ['🥥', '🥥', '🍊'],
              ['🥥', '🍇', '🍋']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[2][0], grid[3][0], grid[4][0]]).to.be.equal([' ', ' ', ' ', ' ']);

    });

    it('should recognize a 5 vertical match', function(){

      grid = [['🍓', '🍊', '🍊'],
              ['🥥', '🍇', '🥥'],
              ['🥥', '🍊', '🍊'],
              ['🥥', '🥥', '🍊'],
              ['🥥', '🍇', '🍋'],
              ['🥥', '🍇', '🍋']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]]).to.be.equal([' ', ' ', ' ', ' ', ' ']);

    });

  })

  // Add tests for swaps that set up combos
  //When the fruits fall down and make a new match, it registers as a combo
  describe('Combo Tests', function(){

    //1. Existing fruits should shift down to the blank spaces left by matched fruits
    it('should shift fruits down to the empty spaces', function(){

      grid = [['🥥', '🍋', '🍊'],
              [' ', ' ', ' ']]

      Bejeweled.shiftFruits(grid);
      expect([grid[1][0], grid[1][1], grid[1][2]]).to.be.equal(['🥥', '🍋', '🍊']);
    });

    //2. When the shifted fruits make a match, add it to the combo counter
    it('should recognize combos when fruits fall to make a match', function(){

      grid = [['🍓', '🍊', '🍊'],
              ['🥥', '🍇', '🥥'],
              ['🥥', '🥥', '🍊'],
              ['🥥', '🍓', '🍓']]

      Bejeweled.checkForMatches(grid); //true
      Bejeweled.deleteFruits(grid); //delete coconut matched fruits
      Bejeweled.shiftFruits(grid); //shift strawberry to grid[3][0]
      expect(Bejeweled.checkForCombos(grid)).to.be.true;
      expect(Bejeweled.getCombo()).to.deep.equal(1);

    });

    //3. If there are no more extra matches after putting new fruits, reset the combo counter
    it('should reset the combo counter after all empty spaces are filled', function(){

      grid = [['🍓', '🍊', '🍊'],
              ['🥥', '🥝', '🥥'],
              ['🥝', '🥥', '🍊'],
              ['🥥', '🍇', '🍋']]

      expect(Bejeweled.checkForMatches(grid)).to.be.false;
      expect(Bejeweled.getCombo()).to.deep.equal(0);
    })

  })

  // Add tests to check if there are no possible valid moves
  describe('Game Over Tests', function(){

    it('should be game over if there are no more valid moves', function(){

      grid = [['🥥', '🥝', '🍇', '🍋', '🍊', '🥥', '🍊', '🍓'],
              ['🥝', '🥥', '🍋', '🍓', '🥝', '🍓', '🍇', '🥥'],
              ['🍊', '🍓', '🥥', '🍇', '🍊', '🥝', '🥥', '🍊'],
              ['🍋', '🍊', '🥝', '🥥', '🍇', '🥥', '🍇', '🍋'],
              ['🍓', '🍋', '🍊', '🥝', '🍊', '🍓', '🍋', '🍊'],
              ['🥝', '🍓', '🍋', '🍇', '🥝', '🥥', '🥝', '🍇'],
              ['🍇', '🥥', '🥝', '🍋', '🍊', '🍓', '🥥', '🍊'],
              ['🍋', '🍓', '🍇', '🍓', '🍋', '🍇', '🍋', '🥥']]

      expect(Bejeweled.checkForMatches(grid)).to.be.false;
      expect(Bejeweled.validMoves(grid)).to.be.false;

    });

    // it('should check if the grid has pairs of fruits', function(){

    //   grid = [['🥥', '🥝', '🍇', '🍋', '🍊', '🥥', '🍊', '🍓'],
    //           ['🥝', '🥥', '🍋', '🍓', '🥝', '🍓', '🍇', '🥥'],
    //           ['🍊', '🥝', '🥥', '🍇', '🍊', '🥝', '🥥', '🍊'],
    //           ['🍋', '🍊', '🥝', '🥥', '🍇', '🥥', '🍇', '🍋'],
    //           ['🍓', '🍋', '🍊', '🥝', '🥥', '🍓', '🍋', '🍊'],
    //           ['🥝', '🍓', '🍋', '🍊', '🥝', '🥥', '🥝', '🍇'],
    //           ['🍇', '🥥', '🍓', '🍋', '🍊', '🍓', '🥥', '🍊'],
    //           ['🍋', '🍓', '🍇', '🍓', '🍋', '🍇', '🍋', '🥥']];

    //   expect(Bejeweled.checkPairs(grid)).to.be.false;

    // });
  })


});
