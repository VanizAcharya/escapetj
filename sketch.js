var player, playerImage;
var background, ground, backgroundImage;
var invisibleGround;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var fruitGroup, mango, lemon, pineapple;
var score,Score;
 
var PLAY =1;
var END =0;
var gameState = PLAY;

var gameOver,gameOverImg;


function preload() {
  backgroundImage = loadImage("background.jpg")
  playerImage = loadImage("newplr.png")
  obstacle1 = loadImage("bird.jpg")
  obstacle2 = loadImage("cheetah.png")
  obstacle3 = loadImage("deer3.png")
  obstacle4 = loadImage("deer2.jpg")
  obstacle5 = loadImage("lion.jpg")

  mango = loadImage("mango.png")
  lemon = loadImage("lemon.png")
  pineapple = loadImage("pineapple.png")
  gameOverImg = loadImage("gameOver.png")

}

function setup() {
  createCanvas(600, 200);


  ground = createSprite(0, 80, 600, 200 )
  ground.addImage("ground", backgroundImage)
  ground.x = ground.width / 2;

  player = createSprite(80, 80, 100, 60)
  player.addImage("player", playerImage)
  player.scale = 0.3

  invisibleGround = createSprite(200, 190, 400, 10)
  invisibleGround.visible = false;

  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverImg)

  obstaclesGroup = createGroup();
  fruitGroup  = createGroup();

  

  score = 100;
}

function draw() {
  //set background to white
  background("black");

  // to jump the player
  if (keyDown("UP_ARROW")) {
    player.velocityY = -15
  }

  
   if(gameState===PLAY){
    gameOver.visible = false;
   }


   // add gravity to player
  player.velocityY = player.velocityY + 0.8

  // give velocity to ground to move
  ground.velocityX = -4;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  // make player collide with invisible ground
  player.collide(invisibleGround)

  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  
  if(obstaclesGroup.isTouching(player)){
    score = score+20
  }

  if(score >5000){
    gameState= END;
  }


  if(gameState ===END){
    gameOver.visible=true;
    obstaclesGroup.destroyEach();
    fruitGroup.destroyEach();
    player.velocityX =0;
    ground.velocityX =0;  
    showScore()
  }

  spawnObstacles();
  spawnFruits();

  drawSprites();
  text("Score:"+ score,500,30);
  
}
function spawnObstacles() {
  if (frameCount % 90 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;

    }
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 500;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnFruits() {
 if(frameCount % 150 ===0){
  var fruit = createSprite(200,130,10,40)
  fruit.velocityX = -2
  
  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: fruit.addImage(mango);
    break;
    case 2 :fruit.addImage(lemon);
    break;
    case 3 : fruit.addImage(pineapple);
    break;

    fruit.scale =0.1;
    fruit.lifetime = 300;
    fruitGroup.add(fruit);
  }
}
}

 function showScore() {
  swal({
    title: `Awesome!${"\n"}Rank${"\n"}${player.score}`,
    text: "You reached the finish line successfully",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
} 

