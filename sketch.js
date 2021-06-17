var space,spaceShip,greenShip,blueShip,redShip,danger;
var spaceImg,spaceShipImg,greenShipImg,blueShipImg,redShipImg,dangerImg;
var treasureCollection = 0;
var greenShipG,blueShipG,redShipG,dangerG;
var bullet,bulletImg,bulletGrp;


//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sc,scImg;
var hb,hbImg;

var b1,b1Img,b2,b2Img;
var bullet,bulletImg;

function preload(){
  redShipImg = loadImage("red1.png");
  spaceImg     = loadImage("bgg.jpeg");
  endImg      =loadAnimation("gameOver.png");
  hbImg       = loadImage("hb.png");
  scImg       = loadImage("ps.JPG");
  b1Img       = loadImage("bb2.jpg")
  b2Img       = loadImage("bb1.jpg");
  spaceShipImg    = loadAnimation("spaceShip.png");
  greenShipImg     = loadImage("green1.png");
  dangerImg    = loadImage("danger.png");
  blueShipImg = loadImage("blue1.png");
  bulletImg   = loadImage("bullet.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
space=createSprite(width/2,200);
space.addImage(spaceImg);
space.velocityY = 4;
space.scale=2.3;
space.depth= -4;  


//creating spaceShip running
spaceShip = createSprite(width/2,height-20,20,20);
spaceShip.addAnimation("SahilRunning",spaceShipImg);
spaceShip.addAnimation("SahilStop",endImg);  
spaceShip.scale=0.4;
  
bullet = createSprite(100,30);  
bullet.addImage(bulletImg);
bullet.scale=0.3
  
sc = createSprite(space.x,30);
sc.addImage(scImg);  
sc.scale=1.5;
 
b1 = createSprite(space.x+355,314);
b1.addImage(b2Img);  
b1.scale=1.5;
b1.visble=false;  
  
b2 = createSprite(space.x-355,224);
b2.addImage(b2Img);  
b2.scale=1.5;  
b2.visble=false;  
  
greenShipG=new Group();
blueShipG=new Group();
redShipG=new Group();
dangerG=new Group();
bulletGrp = new Group();
}

function draw() {

  if(gameState===PLAY){
    background(0);
    spaceShip.x = World.mouseX;

    edges= createEdgeSprites();
    spaceShip.collide(edges);

    //code to reset the background
    if(space.y >height){
      space.y = height/2;
  }
  
    spaceShip.collide(b1);
    spaceShip.collide(b2);
    
    creategreenShip();
    createblueShip();
    createredShip();
    createDanger();

    if (greenShipG.isTouching(bulletGrp)) {
      greenShipG.destroyEach();
      bulletGrp.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (blueShipG.isTouching(bulletGrp)) {
      blueShipG.destroyEach();
      bulletGrp.destroyEach();
      treasureCollection=treasureCollection+100;
       
      }
    else if (dangerG.isTouching(bulletGrp)) {
     bulletGrp.destroyEach();
      treasureCollection=treasureCollection+100;
        gameState=END;
      
    }else if(redShipG.isTouching(bulletGrp)) {
      redShipG.destroyEach();
      treasureCollection=treasureCollection+70;
      bulletGrp.destroyEach();
      
    }else if( touches.length>0 || keyDown("UP_ARROW")){
    bullett();
      bullet.velocityY =- 7;   
      bullet.x = spaceShip.x-25; 
      
          bullett();
      bullet.velocityY =- 7;   
      bullet.x = spaceShip.x+25; 
      
       touches=[];
    }
    }
    
   else{
      if(bulletGrp.isTouching(dangerG)){
        
        gameState = END;
       
    }
  }
  
  

     if(gameState=== END){
       
       space.velocityY=0;
       spaceShip.changeAnimation("SahilStop",endImg)
       spaceShip.scale=0.8;
       spaceShip.x=200;
       spaceShip.y=300;

       hb = createSprite(200,160);  
       hb.addImage(hbImg);
       hb.scale=0.7;
       
      dangerG.destroyEach();
       
       bulletGrp.destroyEach();
       bulletGrp. setVelocityYEach(0);
       greenShipG.destroyEach();
       greenShipG.setVelocityYEach(0);
       
       blueShipG.destroyEach();
       blueShipG.setVelocityYEach(0);
       
       redShipG.destroyEach();
       redShipG.setVelocityYEach(0);
     }
    
 
    
   
  drawSprites();
  stroke("brown")
  strokeWeight(2.7);  
  textSize(30);
  fill(rgb(153,204,255));
  textFont('algerian');  
  text("🚀POINTS: "+ treasureCollection,width/2,37);
    
  

}

function creategreenShip() {
  if (World.frameCount % 200 == 0) {
    var greenShip = createSprite(Math.round(random(50, 350),40, 10, 10));
    greenShip.addImage(greenShipImg);
    greenShip.scale=0.71;
    greenShip.velocityY = 3;
    greenShip.depth= -3;
    greenShip.lifetime = 150;
    greenShipG.add(greenShip);
  }
}

function createblueShip() {
  if (World.frameCount % 320 == 0) {
    var blueShip = createSprite(Math.round(random(50, width-50),70, 10, 10));
    blueShip.addImage(blueShipImg);
    blueShip.scale=0.71;
    blueShip.velocityY = 3;
    blueShip.depth= -3;  
    blueShip.lifetime = 150;
    blueShipG.add(blueShip);
}
}

function createredShip() {
  if (World.frameCount % 410 == 0) {
    var redShip = createSprite(Math.round(random(50, width-50),70, 10, 10));
    redShip.addImage(redShipImg);
    redShip.scale=0.71;
    redShip.velocityY = 3;
    redShip.lifetime = 150;
    redShip.depth= -3;  
    redShipG.add(redShip);
  }
}

function createDanger() {
  if (World.frameCount % 410 == 0) {
    var danger = createSprite(Math.round(random(50, width-50),70, 10, 10));
    danger.addImage(dangerImg);
    danger.scale=0.71;
    danger.velocityY = 3;
    danger.lifetime = 150;
    danger.depth= -3;  
    dangerG.add(danger);
  }
}

function bullett(){
  
  
  if(frameCount%5===0){
    bullet = createSprite(100,400);  
    bullet.addImage(bulletImg);
    bullet.scale=0.2;
    bulletGrp.add(bullet);
    bullet.setCollider("circle",70,390) 
    bullet.depth=-2;
}
}