var test = require("tape");
var game = require("../game.js");


test("generate a keyplayer object form props x,y, alive, number of neighbours", function (t) {
  t.deepEqual(game.cellProp(true,2),{live:true,neighbourNo:2}, "correctly generates object");
  t.end();
})

test("adds correctly to keyplay object", function(t) {
  var testPlayers = {
    "0:0": {live:true, neighbourNo:0}
  };
  game.addToNeighbours(testPlayers, 1, 1);
  t.deepEqual( {live:false, neighbourNo:1}, testPlayers["1:1"], "adds to a nonexisting players");

  game.addToNeighbours(testPlayers, 0, 0);
  t.deepEqual( {live:true, neighbourNo:1}, testPlayers["0:0"], "adds to an existing players");

  t.end();
})

var keyPlayers = {
  "-1:-1": {live:false, neighbourNo:1},
  "-1:0": {live:false, neighbourNo:1},
  "-1:1": {live:false, neighbourNo:1},
  "0:-1": {live:false, neighbourNo:1},
  "0:0": {live:true, neighbourNo:0},
  "0:1": {live:false, neighbourNo:1},
  "1:-1": {live:false, neighbourNo:1},
  "1:0": {live:false, neighbourNo:1},
  "1:1": {live:false, neighbourNo:1}
};

test("from array of alive cells produce all the key elements at the next iteration, key elements are ones who are alive or are dead but have nieghbours", function(t) {
  t.deepEqual(keyPlayers, game.keyPlayers([[0,0]]), "key elements generated")
  t.end();
})

test("for a cell who has its number of neighbours and alive status determine if it'll stay alive", function (t) {
  t.ok(!game.becomesAlive({live:true,neighbourNo:1}), "Rule 1: alive and fewer than 2 neighbours dies");
  t.ok(game.becomesAlive({live:true,neighbourNo:2}), "Rule 2: alive and 2 neighbours stays alive");
  t.ok(game.becomesAlive({live:true,neighbourNo:3}), "Rule 2: alive and 3 neighbours stays alive");
  t.ok(!game.becomesAlive({live:true,neighbourNo:4}), "Rule 3: alive and more than 3 stays alive");
  t.ok(!game.becomesAlive({live:false,neighbourNo:2}), "Rule 4: dead and not 3 neighbours stays dead");
  t.ok(game.becomesAlive({live:false,neighbourNo:3}), "Rule 4: dead and 3 neighbours becomes alive");
  t.end();
})

test("from array of key players produce an array of the coordinates of the live cells at the next iteration", function (t) {
  t.deepEqual(game.nextAlive(keyPlayers), [], "extinction!");
  t.end();
})

test("from current generation of live cells as coords produce the next generation of living cells as coords", function (t) {
  t.deepEqual(game.lifeCycle([[0,0],[0,1]]), [], "two neighbouring cells only");
  t.deepEqual(game.lifeCycle([[0,-1],[0,0],[0,1]]).sort(), [[-1,0],[0,0],[1,0]], "two neighbouring cells only");
  t.deepEqual(game.lifeCycle([[-1,0],[0,-1],[0,1],[1,0]]).sort(), [[-1,0],[0,-1],[0,1],[1,0]], "stationary cross");
  t.end();
});
