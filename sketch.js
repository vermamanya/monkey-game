var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count = 0
var score = 0

var heart1,heart2,heart3

var fruitGroup,banana,pineapple,grapes,watermelon;
var monkey1
var monkey

var restart

var bombGroup, bomb1,bomb3,bomb4
 function preload(){

  monkeyImg = loadAnimation("tile000.png","tile001.png","tile002.png",
  "tile003.png","tile004.png","tile005.png","tile006.png","tile007.png","tile008.png",
  "tile009.png","tile010.png","tile011.png","tile012.png");

  backgroundImg = loadImage("jungle.png")

  bananaImg = loadImage("banana.png")
  pineappleImg = loadImage("pineapple.png")
  grapesImg = loadImage("grapes.png")
  watermelonImg = loadImage("watermelon.png")

  heart1Img = loadImage("heart.png")
  heart2Img = loadImage("heart.png")
  heart3Img = loadImage("heart.png")
  bomb1Img = loadImage("bomb1.png")
  bomb2Img = loadImage("bomb2.png")
  bomb3Img = loadImage("bomb3.png")
  bomb4Img = loadImage("bomb4.png")
  restartImg = loadImage("restart.png")

  blastSound = loadSound("blast.wav")
  fruitSound = loadSound("reward.wav")


}

function setup()
{
  createCanvas(600,340);

    bg = createSprite(200,240)
    bg.addImage(backgroundImg)
    bg.scale = 1.6

    monkey = createSprite(80,300,20,50)
    monkey.debug=false;
    monkey.addAnimation("monkey_running",monkeyImg)
    monkey.scale = 1

    heart1 = createSprite(400,20)
    heart1.addImage(heart1Img)
    heart1.scale = 0.15

    heart2 = createSprite(450,20)
    heart2.addImage(heart2Img)
    heart2.scale = 0.15

    heart3 = createSprite(500,20)
    heart3.addImage(heart3Img)
    heart3.scale = 0.15

    restart = createSprite(300,200)
    restart.addImage(restartImg)
    restart.scale = 0.13
   
    monkey.setCollider("rectangle",0,0,50,50)

     ig = createSprite(220,340,600,20)
     ig.visible=false

     bombGroup = new Group()
     fruitGroup = new Group()

     
}

function draw(){


if (gameState===PLAY){
  bg.velocityX =3
  if(bg.x>500){
      bg.x=100
  }
      if(keyDown("space")&& monkey.y >=100) {
        monkey.velocityY = -13;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ig)
    fruits()
    bombs() 

    if(fruitGroup.isTouching(monkey)){
      score = score + 100
      fruitGroup.destroyEach()
      console.log(score)
      fruitSound.play()
      }
    
     
     if(bombGroup.isTouching(monkey)){
      count = count+1
      bombGroup.destroyEach()
      console.log(count)
      blastSound.play()
     }
  
     if(count >= 1){
      heart1.visible = false
     }
     if(count >= 2){
      heart2.visible = false
     }
     if(count >= 3){
      heart3.visible = false

      gameState = END;
     }
}


else if (gameState === END) {
  restartImg.visible = true
  bg.velocityX = 0
  if(mousePressedOver(restart)) {      
    reset();
  }



}







  drawSprites()
   
  fill("red")
textSize(30)
text("score = " + score ,0,25)



  }

  function fruits(){
    if(frameCount % 60 === 0){
      fruit = createSprite(500,200,50,50)
      fruit.velocityX=-3;
       fruit.y=Math.round(random(50,300))
      var rand = Math.round(random(1,4))
      switch(rand){
        case 1: fruit.addImage(bananaImg);
        fruit.scale=0.08
        break;
        case 2: fruit.addImage(pineappleImg);
        fruit.scale=0.08
        break;
        case 3: fruit.addImage(grapesImg);
        fruit.scale=0.08
        break;
        case 4: fruit.addImage(watermelonImg);
        fruit.scale=0.08
        break;
        default:break
      }
      fruitGroup.add(fruit)
    }
    }
    
    function bombs(){
      if(frameCount % 120 === 0){
        bomb = createSprite(500,150,50,50)
        bomb.velocityX=-3;
        bomb.scale=0.2
        var rand = Math.round(random(1,4))
        switch(rand){
          case 1: bomb.addImage(bomb1Img);
     
          break;
          case 2: bomb.addImage(bomb2Img);
         
          break;
          case 3: bomb.addImage(bomb3Img);
        
          break;
          case 4: bomb.addImage(bomb4Img);
        
          break;
          default:break
        }
        bombGroup.add(bomb)
      }
      }

      function reset(){
        gameState = PLAY;
        restart.visible = false
        bg.visible = false
        bg.velocityX = 0
        fruitGroup.destroyEach()
        bombGroup.destroyEach()
        //monkey.changeAnimation("monkey_running",monkeyImg);
      

        score = 0
      }