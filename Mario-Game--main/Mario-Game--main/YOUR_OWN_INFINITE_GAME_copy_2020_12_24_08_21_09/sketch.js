var mario , mario_ani
var ground , ground_Ima , inviG
var cloudGrp , cloud_Ima
var Fire , Fire_Ima , fireGrp
var coin_Ima , coinGrp
var coin
var obstaclesGroup, obstacle , obs_Ima
var kill = 0 , waste =0 , Rs=0
var points , killing , wasted

var gameState = "Play" 


function preload()
  {
   mario_ani = loadAnimation("mario1.png" , "mario2.png" , "mario3.png");
    ground_Ima = loadImage("Mario Ground.png");
    Fire_Ima = loadImage("Mario Fire.png")
    coin_Ima = loadImage("Mario Coin.png")
    obs_Ima = loadImage("FOE 2.png")
    cloud_Ima = loadImage("Mario Cloud.png")
    
    points = loadSound("KillOP.mp3")
    killing = loadSound("Recording (2).m4a")
    wasted = loadSound("Wasted.mp3")
    
  }



function setup()
  {
    createCanvas(800, 300);
    
    //mario Basics
    mario = createSprite(100,220,20,20);
    mario.addAnimation("Lmao" , mario_ani);
    mario.scale=0.7;
    mario.velociyY=-12;
    
    //ground Basics 
    ground = createSprite(450,250);
    ground.addImage("Lmao" , ground_Ima)
    ground.scale= 3;
    ground.velocityX = -2
    
    //making the invisible Ground
    inviG = createSprite(400,275,800,30)
    inviG .visible=false;
    
     
    
    fireGrp         =new Group();
    obstaclesGroup  =new Group();
    coinGrp         =new Group();
    cloudGrp        =new Group();
    
  }


function draw() 
{
  background("lightblue");
  text("Kills :"+ kill,750,50)
  text("Coins Wasted:"+ waste ,650,50)
  text("Total Score:"+ Rs ,550,50)
  
    
  if(gameState === "Play") 
{
    
    //making the ground be forever ; 
    if(ground.x<350)
    {
      ground.x=400;
    }
    //end

    //making mario jump
    if(keyDown("space")&& mario.y >= 120)
    {
      mario.velocityY = -10;
   }
  //end  


    //making it throw fire
    if (keyDown("F"))
    {
      createFire();
    } 
  //end 

    if (fireGrp.isTouching(obstaclesGroup)) 
      {
      obstaclesGroup.destroyEach();
      fireGrp.destroyEach();
      kill= kill+1
      
      Rs = Rs +5;
      killing.play();
      }
  
    if (fireGrp.isTouching(coinGrp)) 
      {
      coinGrp.destroyEach();
      fireGrp.destroyEach();
      Rs = Rs -5;
      wasted.play();
      }
  
    if (mario.isTouching(coinGrp)) 
      {
       coinGrp.destroyEach()
       points.play()
       Rs = Rs+10
      }


      if (mario.isTouching(obstaclesGroup)) 
      {
        obstaclesGroup.destroyEach()
       Rs = Rs-10
      }


  spawnCoin();
  spawnObstacles();

  text ("Press F To Shoot And SPACE To Jump",50,50)

  
}


 
    
  
  //making Mario Not Fall 
   mario.velocityY= mario.velocityY +1.5;
  //end
    
  
  
    mario.collide(inviG);
    drawSprites();
    
}


function createFire() 
{
  Fire = createSprite(100, 100, 60, 10);
  Fire.addImage(Fire_Ima);
  Fire.x = mario.x;
  Fire.y = mario.y;
  Fire.velocityX = 6;
  Fire.lifeTimeEach = 10;
  Fire.scale = 0.1; 
  fireGrp.add(Fire) 
}


function spawnCoin()
{
  if (frameCount % 160 === 0) 
  {
    coin = createSprite(700,120);
    coin.addImage(coin_Ima);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 250;
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = coin.depth + 1;
    
    //add each cloud to the group
    coinGrp.add(coin);
  }
}


function spawnObstacles()
{
   if (frameCount % 180 === 0)
     {
      obstacle = createSprite(700,240);
      obstacle.velocityX = -3
      obstacle.addImage(obs_Ima)
      
        
        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.2;
        obstacle.lifetime = 300;

       //add each obstacle to the group
        obstaclesGroup.add(obstacle);
   }
}


