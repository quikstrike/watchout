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
var gameBoard = d3.select('.container')
                  .append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height)
// create player --- {}
// will have var x, y;
//  needs a color (not blue)
// needs to be draggable ---
//

var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'red'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'black'); });

var player = d3.select('.container').select('svg')
               .selectAll('div')
               .data([1])
               .enter().append('circle')
               .attr('class','player')
               .attr('cx', gameOptions.width/2)
               .attr('cy', gameOptions.height/2)
               .attr('r',25)
               .call(drag)
               .style('fill', 'red')


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

var enemiesArray = createEnemies();


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
d3.select('.container').select('svg')
  .selectAll('div')
  .data(enemiesArray)
  .enter().append('circle')
  .attr('class','enemy')
  .attr('cx', function (d){return d.x})
  .attr('cy', function (d){ return d.y})
  .attr('r',25)
  .style('fill', 'blue')

enemies = d3.selectAll('.enemy')

var enemyMove = function(){
  enemies.transition()
  .duration(1000)
  .each(function(d){
    d3.select(this)
    .transition()
    .attr('cx',Math.random()*gameOptions.width)
    .attr('cy',Math.random()*gameOptions.height)
  })
}

setInterval(enemyMove,1000)
