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
    expect(cursor.selected).to.deep.equal({row: 0, col: 0});
  });

  it('can only move one space from the selected item when swapping', function(){

    cursor.selected = {row: 0, col: 0}
    cursor.swapMode = true;

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

  });

  it('processes the swap if it is a match', function(){

    let grid = [['🍓', '🥥', '🍊'],
                ['🥥', '🍇', '🥥'],
                ['🥥', '🍊', '🍊'],]

    cursor.swapMode = true;
    cursor.select();
    cursor.right();

    cursor.swap(grid); //swap with the coconut on the right
    expect(Bejeweled.checkForMatches(grid)).to.deep.equal([{row: 0, col:0}, {row: 1, col: 0}, {row: 2, col: 0}]);
    expect(cursor.swapMode).to.be.false;
  });

  it('should swap back if it is not a match', function(){

    let grid = [['🥥', '🍋', '🍊'],
                ['🍓', '🍇', '🍓'],
                ['🥥', '🍋', '🍊']]

    cursor.swapMode = true;
    cursor.select();
    cursor.down();

    cursor.swap(grid); //swap with the strawberry on the bottom
    expect(Bejeweled.checkForMatches(grid)).to.be.false;
    expect(grid[0][0]).to.deep.equal('🥥');
  });


});
