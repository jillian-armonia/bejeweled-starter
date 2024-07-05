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

  // Add tests for swaps that set up combos
  describe('4 and 5 Combo Tests', function(){

    it('should recognize a 4-combo horizontal match', function(){

      grid = [['🥥', '🍋', '🍊', '🍇'],
              ['🍓', '🍓', '🍓', '🍓']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[1][1], grid[1][2], grid[1][3]]).to.be.equal([' ', ' ', ' ', ' ']);

    });

    it('should recognize a 5-combo horizontal match', function(){

      grid = [['🥥', '🍋', '🍊', '🍇', '🥥'],
              ['🍓', '🍓', '🍓', '🍓', '🍓']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[1][1], grid[1][2], grid[1][3], grid[1][4]]).to.be.equal([' ', ' ', ' ', ' ', ' ']);

    });

    it('should recognize a 4-combo vertical match', function(){

      grid = [['🍓', '🍊', '🍊'],
              ['🥥', '🍇', '🥥'],
              ['🥥', '🍊', '🍊'],
              ['🥥', '🥥', '🍊'],
              ['🥥', '🍇', '🍋']]

      expect(Bejeweled.checkForMatches(grid)).to.be.true;
      Bejeweled.deleteFruits(grid);
      expect([grid[1][0], grid[2][0], grid[3][0], grid[4][0]]).to.be.equal([' ', ' ', ' ', ' ']);

    });

    it('should recognize a 5-combo vertical match', function(){

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
