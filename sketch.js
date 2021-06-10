var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var ground;
var banana,bananaImage,bananaGroup;
var obstacle, obstacleImage,obstacleGroup;
var score,survivalTime;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
//make monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
//make ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;

  bananaGroup= new Group();
  obstacleGroup= new Group();
  
 survivalTime=0;
 score=0;
}


function draw() {
  background("white");

  if(gameState===PLAY){
    
  //to make monkey jump when space is pressed
  if(keyDown("space") && monkey.y >= 259) {
      monkey.velocityY = -12;}
  
  //to add gravity 
 monkey.velocityY = monkey.velocityY + 0.8;
  
  //to make ground lenght infinite
 if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  //to make monkey run on ground
  monkey.collide(ground);
  
  //to create obstacles
 createObstacles();
  
  //to create banana
 createBanana();
    
  
  survivalTime=Math.ceil(frameCount/frameRate());
  
  //to change gameState
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }}
  else if (gameState === END){
   
    //set velocity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
  //to reset the game after R is pressed
   if(keyDown("R"))
  {  reset();
  }
  
  }
  
 drawSprites();
  
 stroke("white");
 textSize(20);
 fill("white");
 text("Score: "+ score, 500,50);

 stroke("black");
 textSize(20);
 fill("black");
 text("SurvivalTime:"+survivalTime,60,50);
}


function createBanana(){
  
   //to create the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
     //to add each banana to group
     bananaGroup.add(banana);
  }
    
}


function createObstacles(){
  
  //to create obstacle after every 300 frames
  if(frameCount % 300 === 0) {
  var obstacle = createSprite(600,330,10,40);
  obstacle.velocityX=-6;
  obstacle.addImage(obstacleImage);

    
  //assigning scale to the obstacle           
    obstacle.scale = 0.1;
    
  //assingning lifetime to the variable
    obstacle.lifetime = 100;
    
  //addind each obstacle to the group
    obstacleGroup.add(obstacle);
  
} }

function reset()
{
  gameState=PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0;
  SurvivalTime=0;
}

