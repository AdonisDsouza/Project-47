var canvas;
var background1, backgroundImg;
var mario, marioImg; 
var cloudImage, cloudGroup;
var brickImage, brickGroup;
var diamondImage, diamondGroup;
var invisibleGround
var lives = 3;
var level = 1;
var score = 0;
var gameState = 0;

function preload(){

    //creating the background image
    backgroundImg = loadImage("background1.jpg");

    //loading the mario image
    marioImg = loadAnimation("Mario1.png", "Mario2.png");

    //loding the loud image
    cloudImage = loadImage("Cloud1.png");

    //loading the hole image
    //diamondImage = loadImage("");

    //loading the brick image
    brickImage = loadImage("Brick1.jpg");

    //loading the animation for diamonds
    diamondImage = loadImage("diamond.png");

    //loading the star image
    starImage = loadImage("star.png");

    //loading the bear image
    bearImage= loadImage("bear.png");

}


function setup(){
    canvas = createCanvas(displayWidth , displayHeight-80);

    //creating the background and adding the image that is loaded in function preload;
    background1 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    background1.addImage("backgroundImg1",backgroundImg);
    //scaling the background and making it smaller
    background1.scale = 0.54;

    //Creating the Mario character
    mario = createSprite(150,displayHeight-150,40,50);
    mario.addAnimation("MarioWalking",marioImg);
    mario.scale = 0.35;


    //creating the cloud,brick and hole group;
    cloudGroup = new Group();
    diamondGroup = new Group();
    brickGroup = new Group();


    //creating the invisible ground
    invisibleGround = createSprite(width/2,height-20,width,10);
    invisibleGround.visible = false;
}


function draw(){

    background("white");

    mario.velocityX = 0;

    if(level === 1){
    if(gameState === 0) {
    //When the space bar is pressed the mario the jumps;
    if(keyDown("space")) {
        mario.velocityY = -12;

      }

      mario.velocityY = mario.velocityY + 0.55

      //using the right arrow to move the character forward;
      if(keyDown("RIGHT_ARROW")) {
          mario.velocityX= 2;
      }

      /*if(keyDown("LEFT_ARROW")) {
          mario.velocityX = -2;
      }*/
    mario.collide(invisibleGround);
    console.log(mario.y);

    for(var i=0; i<brickGroup.length; i++) {
        
        if(mario.isTouching(brickGroup.get(i))){
            brickGroup.get(i).destroy();
            lives = lives-1;
        }
    }

    if(lives<=0){
        gameState = 1;
    } 
    
    for(var i=0; i<diamondGroup.length; i++) {
        if(mario.isTouching(diamondGroup.get(i))){
            diamondGroup.get(i).destroy();
            score = score + 10;
        }
    }

    if(score>=20){
        gameState = 2;
    }

    
    //text("Score:" + score,displayWidth-100, 20);
    //text("Lives:" + lives,displayWidth-200,20);

    //spawning the bricks,clouds and holes on the screen;
    spawnBricks();
    spawnClouds();
    spawnDiamonds();
    }

    if(gameState === 1) {
        background1.visible = false;
        mario.visible = false;
        cloudGroup.destroyEach();
        brickGroup.destroyEach();
        diamondGroup.destroyEach();
        background("red");
        textSize(20);
        fill("yellow")
        text(" YOU LOSE", displayWidth/2, displayHeight/2);
        score = 0 ;

    }
}
    if(gameState === 2){
        level = 2;
        score = 0;
        lives = 3;
        gameState = 0;
    }

    if(level ===2){

        if(gameState === 0) {
            //When the space bar is pressed the mario the jumps;
            if(keyDown("space")) {
                mario.velocityY = -12;
        
              }
        
              mario.velocityY = mario.velocityY + 0.55
        
              //using the right arrow to move the character forward;
              if(keyDown("RIGHT_ARROW")) {
                  mario.velocityX= 2;
              }
        
              /*if(keyDown("LEFT_ARROW")) {
                  mario.velocityX = -2;
              }*/
            mario.collide(invisibleGround);
            console.log(mario.y);
        
            for(var i=0; i<brickGroup.length; i++) {
                
                if(mario.isTouching(brickGroup.get(i))){
                    brickGroup.get(i).destroy();
                    lives = lives-1;
                }
            }
        
            if(lives<=0){
                gameState = 1;
            } 
            
            for(var i=0; i<diamondGroup.length; i++) {
                if(mario.isTouching(diamondGroup.get(i))){
                    diamondGroup.get(i).destroy();
                    score = score + 10;
                }
            }
        
            if(score>=20){
                gameState = 2;
            }
            //text("Score:" + score,displayWidth-100, 20);
            //text("Lives:" + lives,displayWidth-200,20);
        
            //spawning the bricks,clouds and holes on the screen;
            spawnBricks();
            spawnClouds();
            spawnDiamonds();
            }
        
            if(gameState === 1) {
                background1.visible = false;
                mario.visible = false;
                cloudGroup.destroyEach();
                brickGroup.destroyEach();
                diamondGroup.destroyEach();
                background("red");
                textSize(20);
                fill("yellow")
                text(" YOU LOSE", displayWidth/2, displayHeight/2);
                score = 0 ;
        
            }
    
    }

    drawSprites();
    textSize(25);
    fill("black");
    text("Score:" + score,displayWidth-100, 20);
    text("Lives:" + lives,displayWidth-200,20);
    text("Level:" + level,displayWidth-300,20);
}
function spawnClouds(){

    if(frameCount%160 === 0) {
        var cloud = createSprite(displayWidth+20,100,10,10);
        cloud.y = Math.round(random(35,50));
        cloud.addImage(cloudImage);
        cloud.velocityX = -2;
        cloud.lifetime = displayWidth/2;
        cloudGroup.add(cloud);
        cloud.scale = 0.35

    }


}

function spawnDiamonds(){

    if(frameCount%120 === 0) {
        var diamond = createSprite(displayWidth+20,height-25,10,10);
        diamond.y = Math.round(random(displayHeight/3+100,displayHeight/2+100));
        //diamond.addImage(holeImage);
        diamond.velocityX = -3;
        diamond.lifetime = displayWidth/3;
        diamondGroup.add(diamond);

         //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: diamond.addImage(diamondImage);
      diamond.scale = 0.1;
              break;
      case 2: diamond.addImage(starImage);
      diamond.scale = 0.1;
              break;
      case 3: diamond.addImage(bearImage);
      diamond.scale = 0.2;
              break;
      default: break;
    }
    }

}

function spawnBricks(){

    if(frameCount%155 === 0) {
        var brick = createSprite(displayWidth+20,height-36,10,10);
       // brick.y = Math.round(random(displayHeight/3+100,displayHeight/2+100));
        brick.addImage(brickImage);
        brick.velocityX = -2;
        brick.lifetime = displayWidth/2;
        brick.scale = 0.25;
        brickGroup.add(brick);
    }

}
