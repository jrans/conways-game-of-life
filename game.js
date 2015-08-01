var game={};

var cellProp = game.cellProp= function(live,neighbourNo) {
  return {live: live, neighbourNo: neighbourNo};
}

var addToNeighbours = game.addToNeighbours = function (a, x, y) {
  if (a[x+":"+y]) {
    a[x+":"+y].neighbourNo+=1;
  } else {
    a[x+":"+y]=cellProp(false,1);
  };
};

var keyPlayers = game.keyPlayers = function (alive) {
  var players = {};

  alive.forEach( function (e) {
    players[e[0]+":"+e[1]] = cellProp(true, 0);
  });

  alive.forEach(function (a) {
    var x = a[0];
    var y = a[1];
    var neighbours = [
      [x-1,y-1],[x-1,y],[x-1,y+1],
      [x,y-1],          [x,y+1],
      [x+1,y-1],[x+1,y],[x+1,y+1]
    ];
    neighbours.forEach( function (e) {
      addToNeighbours(players, e[0], e[1]);
    })
  });

  return players;
}

var becomesAlive = game.becomesAlive = function (cellProps) {
  return cellProps.neighbourNo === 3 || (cellProps.live && cellProps.neighbourNo === 2);
}

var nextAlive = game.nextAlive = function (playersObj) {
  var next = [];
  for (var key in playersObj) {
    if (becomesAlive(playersObj[key])) {
      next.push(key.split(":").map(Number));
    }
  };
  return next;
}

game.lifeCycle = function (currentCells) {
  return nextAlive(keyPlayers(currentCells));
}



module.exports=game;
