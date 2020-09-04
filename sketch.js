
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground
var survivaltime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400, 400);
  
 monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(50,350,400,10);
  ground.x = ground.width /2;
  
  //create Obstacle and banana Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  
  background("white");
  //displaying survival Time.
  stroke ("black");
  textSize (20);
  fill ("black");
  survivaltime = Math.ceil (frameCount/frameRate())
  text ("survivaltime: "+ survivaltime,100,50 )


  ground.velocityX = -(4 + 3* score/100)
    
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //spawn the banana
    spawnbanana();
  
    //spawn obstacle on the ground
    spawnobstacle();
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  drawSprites();
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6

    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}