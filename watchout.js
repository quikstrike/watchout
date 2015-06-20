
var gameOptions = {
    height: 450,
    width: 700,
    nEnemies: 10,
    padding: 20
}

var gameStats = {
    score: 0,
    bestScore: 0,
    collision : 0
}
var gameBoard = d3.select('.container')
                  .append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height)

var randomLocX = function(){
  return Math.random()*gameOptions.width
}

var randomLocY = function(){
  return Math.random()*gameOptions.height
}

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
  gameStats.score = gameStats.score + 10;
  d3.select('.current > span')
      .text(gameStats.score.toString())
}

var updateBestScore =  function (){
  if (gameStats.score > gameStats.bestScore){
    gameStats.bestScore = gameStats.score;
    d3.select('.high > span').text(gameStats.bestScore.toString())
  }
}

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
  .attr('cx',randomLocX)
  .attr('cy',randomLocY)
  .each('end',function(){
    enemyMove( d3.select(this))
  })
}
enemyMove();
var prevCollision = false
var checkCollision = function() {
  var radiusSum, separation, xDiff, yDiff, collision;

  d3.selectAll(".enemy").each(function(){
    radiusSum = parseFloat(25) + parseInt(player.attr("r"));
    xDiff = parseFloat(d3.select(this).attr('cx')) - parseFloat(player.attr("cx"));
    yDiff = parseFloat(d3.select(this).attr('cy')) - parseFloat(player.attr("cy"));
    separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum){
    collision = true
  }})


    if(collision){
      updateBestScore()
      gameStats.score = 0;

        if(prevCollision != collision){
          gameStats.collision++
          d3.select('.collisions > span')
        .text(gameStats.collision.toString())
        }
    }
    prevCollision = collision
};

d3.timer(checkCollision)
setInterval(updateScore, 100);

