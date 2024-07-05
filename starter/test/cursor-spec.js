const { expect } = require('chai');

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");
const Bejeweled = require('../class/bejeweled.js')
const { it } = require('mocha');

describe ('Cursor', function () {

  let cursor;

  beforeEach(function() {
    cursor = new Cursor(3, 3);
  });


  it('initializes for a 3x3 grid', function () {
    expect(cursor.row).to.equal(0);
    expect(cursor.col).to.equal(0);
  });

  it('correctly processes down inputs', function () {

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);
  });

  it('correctly processes up inputs', function () {

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('processes right inputs', function () {

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
  });

  it('processes left inputs', function () {

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('indicates an item has been selected', function(){

    let grid = [['🥥', '🍋', '🍊'],
                ['🍓', '🍇', '🍓'],
                ['🥥', '🍋', '🍊']]

    cursor.select();
    expect(cursor.swapMode).to.be.true;
    expect(Bejeweled.selectFruit(grid)).to.be.equal({row: 0, col: 0});
  });

  it('can only move one space from the selected item when swapping', function(){

    cursor.swapMode = true;

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);
  });

  it('processes the swap if it is a match', function(){

    let grid = [['🍓', '🥥', '🍊'],
                ['🥥', '🍇', '🥥'],
                ['🥥', '🍊', '🍊'],]

    cursor.swapMode = true;
    cursor.select();
    Bejeweled.selectFruit(grid); //{row: 0, col: 0}

    cursor.swap(); //swap with the coconut on the right
    expect(Bejeweled.checkForMatches(grid)).to.be.true;
    expect(cursor.swapMode).to.be.false;
    expect(grid[0][0]).to.be.equal(' ');
  });

  it('should throw an error if it is not a match', function(){

    let grid = [['🥥', '🍋', '🍊'],
                ['🍓', '🍇', '🍓'],
                ['🥥', '🍋', '🍊']]

    cursor.swapMode = true;
    cursor.select();
    Bejeweled.selectFruit(grid); //{row: 0, col: 0}

    cursor.swap(); //swap with the lemon on the left
    expect(Bejeweled.checkForMatches(grid)).to.be.false;
    expect(cursor.swap()).to.throw(Error, 'No match');
  });


});
