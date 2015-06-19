// start slingin' some d3 here.

var gameOptions = {
    height: 450,
    width: 700,
    nEnemies: 10,
    padding: 20
}

var gameStats = {
    score: 0,
    bestScore: 0
}
var gameBoard = d3.select('.container').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)
                .style('background-color', 'green')

var createEnemies = function (){
  var enemyArray =[];
  for (var i = 0; i<gameOptions.nEnemies; i++){
    enemyArray.push({
      id: i,
      x: Math.random()*gameOptions.width,
      y: Math.random()*gameOptions.height
    })
  }
  return enemyArray
}

var updateScore = function (){
  d3.select('#current-score')
      .text(gameStats.score.toString())
    }

var updateBestScore =  function (){
  gameStats.bestScore = (function(){
    return gameStats.score > gameStats.bestScore ? gameStats.score : gameStats.bestScore})() //return high score between gameStats.bestScore, and gameStats.score

  d3.select('#best-score').text(gameStats.bestScore.toString())
    }

//enemy
d3.select('.container').select('svg').selectAll('div').data(createEnemies).enter().append('circle').attr('cx', function (d){
  return d.x}).attr('cy', function (d){ return d.y}).attr('r',25).style('fill', 'blue')



