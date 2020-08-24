let randAussen;
let figur;
let boden;
let plattform01;

let sammelobjekt01;
let sammelobjekt02;
let sammelobjekte;
let sammelzaehler = 0;

let geschwindigkeit = 5;

let SCHWERKRAFT = 1;
let SPRUNG = 15;

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.position(10,10);

  randAussen = new Group();
  sammelobjekte = new Group();

  let seitenWandLinks = createSprite(0, height/2, 10, height);
  seitenWandLinks.shapeColor = color("lightgray");
  seitenWandLinks.immovable = true;
  randAussen.add(seitenWandLinks);
  
	let seitenWandOben = createSprite(width/2, 0, width, 10);
  seitenWandOben.shapeColor = color("lightgray");
  seitenWandOben.immovable = true;
  randAussen.add(seitenWandOben); 
  
  let seitenWandRechts = createSprite(width, height/2, 10, height);
  seitenWandRechts.shapeColor = color("lightgray");
  seitenWandRechts.immovable = true;
  randAussen.add(seitenWandRechts);   
  
  boden = createSprite(width/2, height, width, 100);
  boden.shapeColor = color("lightgray");
  boden.immovable = true;
  
  plattform01 = createSprite(500, height-150, 300, 50);
  plattform01.shapeColor = color("teal");
  plattform01.immovable = true;  
  
  sammelobjekt01 = createSprite(plattform01.position.x-20, plattform01.position.y-35, 20, 20);
  sammelobjekt01.shapeColor = color("yellow");
  sammelobjekte.add(sammelobjekt01);
  
  sammelobjekt02 = createSprite(plattform01.position.x+120, plattform01.position.y-35, 20, 20);
  sammelobjekt02.shapeColor = color("green");  
  sammelobjekte.add(sammelobjekt02);
  
  figur = createSprite(50, height-75, 20, 50);
  figur.shapeColor = color("red");
}

function draw() {
  background(252);

  figur.collide(randAussen,stopp);
  
  sammelobjekte.collide(figur,sammeln);
  
  figur.velocity.y += SCHWERKRAFT;
  
  if(figur.collide(boden)) {
    figur.velocity.y = 0;
  } 
  
  if(figur.collide(plattform01)) {
    figur.velocity.y = 0;
  }   

  if(keyWentDown('d')) {
      figur.velocity.x = geschwindigkeit;
  }
  if(keyWentUp('d')) {
      figur.velocity.x = 0;
  }
  if(keyWentDown('a')) {
      figur.velocity.x = -geschwindigkeit;
  }
  if(keyWentUp('a')) {
      figur.velocity.x = 0;
  }  
  if(keyWentDown('w')) {
      figur.velocity.y = -SPRUNG;
  }

  drawSprites();
  
  fill(0);
  strokeWeight(0);
  textSize(20);
  text("Gesammelt: "+ sammelzaehler.toString(), 30, 50);
}

function stopp() {
  figur.velocity.x = 0;
  figur.velocity.y = 0;
}

function sammeln(objekt) {
  sammelzaehler++;
  objekt.remove();
}