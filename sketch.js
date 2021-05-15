var player
var robot
var lGun
var playerHealth=100
var robotHealth=100
var lose
var win
var ammo=30
var gameState="play"
var bulletsGroup
var bullets1Group
function preload(){
playerIMG=loadImage("Images/MEN.png")
robotIMG=loadImage("Images/Robot.jpg")
bgIMG=loadImage("Images/fighting.jpg")
lGunIMG=loadImage("Images/GUN-L.jpg")
winIMG=loadImage("Images/You Win.png")
loseIMG=loadImage("Images/you loose.png")
}
function setup() {
  createCanvas(1600,800);
  player=createSprite(140,400,50,80)
  robot=createSprite(1430,400,50,80)
  robot.velocityY=10
  rGun=createSprite(400,400,70,80)
  lGun=createSprite(1200,400,70,80)
  win=createSprite(400,400)
  lose=createSprite(400,400)
  edges=createEdgeSprites()
  player.addImage(playerIMG)
  robot.addImage(robotIMG)
  lGun.addImage(lGunIMG)
  win.addImage(winIMG)
  lose.addImage(loseIMG)
  bulletsGroup=new Group()
  bullets1Group=new Group()
  win.scale=0.59  
  lGun.scale=0.3
  rGun.scale=0.3
  robot.scale=0.2
  player.scale=0.5
  win.visible=false
  lose.visible=false
  player.shapeColor="red"
  robot.shapeColor="blue"
  lGun.shapeColor="green"
  rGun.shapeColor="black"
}

function draw() {
  background(bgIMG);
  
  text("ammo- "+ammo,100,100)
  if(gameState=="play"){
    if (mouseIsPressed) {
    if (mouseButton === LEFT) {
    bullets();
    }
  }
  if(keyDown(UP_ARROW)){
  player.y=player.y-50
  }
  if(keyDown(DOWN_ARROW)){
  player.y=player.y+50  
  }
  rGun.y=player.y
  rGun.x=player.x+80
  for(var i=0;i<bulletsGroup.length;i++){
    if(bulletsGroup.get(i).isTouching(robot)){
  bulletsGroup.get(i).destroy()
   robotHealth=robotHealth-5
     
    }
 }
  for(var i=0;i<bullets1Group.length;i++){
    if(bullets1Group.get(i).isTouching(player)){
  bullets1Group.get(i).destroy()
   playerHealth=playerHealth-5
     
    }
 }
  
  text("Player Health = "+playerHealth,300,200)
  text("Robot Health = "+robotHealth,600,200)
if(ammo===0&&playerHealth==0&&robotHealth==0){
gameState="end"
}

lGun.y=robot.y
robot.bounceOff(edges)

bullets1()
}
else if(gameState=="end"){
robot.velocityY=0
player.velocityY=0
bulletsGroup.destroyEach()
bullets1Group.destroyEach()
}
player.collide(edges)
  drawSprites();
}
function bullets(){
  if(frameCount%10==0){
var bullet=createSprite(rGun.x,rGun.y,20,10)
bullet.shapeColor="red"
bullet.velocityX=30
ammo=ammo-1
console.log("bullets")
bulletsGroup.add(bullet)
}
}
function bullets1(){
if(frameCount%10==0){
var bullet=createSprite(lGun.x,lGun.y,20,10)
bullet.shapeColor="yellow"
bullet.attractionPoint (30,player.x,player.y)
bullets1Group.add(bullet)
}

}