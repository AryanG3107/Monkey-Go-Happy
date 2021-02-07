var ground, groundImage, monkey, monkeyImage
var bananaGroup, stoneGroup
var score = 0
var gameOver
var gameState = "play"
var restet
function preload(){
  groundImage = loadImage("jungle.jpg")
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 bananaImage = loadImage("banana.png")
 stoneImage = loadImage("stone.png")
  gameOverImage = loadImage("aznrmij72wu4ma9mcads.jpg")
  resetImage = loadImage("reset-button-computer-icons-arrow-png-favpng-yCa7BtbPPw7Tni0m4SFPHnEKM.jpg")
  
}
function setup() {
  createCanvas(600,400);
  ground = createSprite(300,200)
  ground.addImage(groundImage);
  ground.scale = 1.5
  ground.x = ground.width/2
  ground.velocityX = -5
  monkey = createSprite(50,350)
  monkey.addAnimation("Running", monkeyImage)
  monkey.scale = 0.2
  invisibleGround = createSprite(300,380, 600, 20)
  invisibleGround.visible = false
  bananaGroup = new Group()
  stoneGroup = new Group()
  gameOver = createSprite(300,200)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.2
  gameOver.visible = false
  reset = createSprite(300,280)
  reset.addImage(resetImage)
  reset.scale = 0.1
  reset.visible = false
}

function draw() {
  background("white");
  if(gameState === "play"){
  ground.velocityX = -5
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  if(keyDown("space")){
    monkey.velocityY = -10;
       
  }
  monkey.velocityY += 0.8;
  monkey.collide(invisibleGround)
  banana1();
  obstacle();
  for(var i = 0; i < bananaGroup.length; i++){
  if(monkey.isTouching(bananaGroup[i])){
    bananaGroup[i].destroy()
    score = score + 5
  }
}
    if(monkey.isTouching(stoneGroup)){
      gameState = "end"
    }
  }
  
  if(gameState === "end"){
    ground.velocityX = 0
    bananaGroup.setVelocityXEach(0)
    stoneGroup.setVelocityXEach(0)
    bananaGroup.setLifetimeEach(-1)  
    stoneGroup.setLifetimeEach(-1)
    monkey.velocityY = 0
    gameOver.visible = true
    bananaGroup.destroyEach()
    stoneGroup.destroyEach()
    monkey.visible = false
    reset.visible = true
    if(mousePressedOver(reset)){
      restart()
    }
  }
  drawSprites();
  textSize(20)
  stroke("white")
  fill("white")
  text("Score: " + score ,50, 50)
}

function banana1(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, Math.round(random(120,180)))
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -5
    banana.lifetime = 215
    bananaGroup.add(banana);
  }
}

function obstacle(){
    if(frameCount % 300 === 0){
    var stone = createSprite(600, 365)
    stone.addImage(stoneImage);
    stone.scale = 0.15
    stone.velocityX = -5
    stone.lifetime = 215
    stoneGroup.add(stone);
    }
}

function restart(){
  gameState = "play"
  monkey.visible = true
  reset.visible = false
  gameOver.visible = false
  score = 0
  
}
