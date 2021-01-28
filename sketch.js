let myImage;
let mySong;
let proportion;
let pSize = 5;

let ns = 500;
let p = [];


function preload(){
  myImage = loadImage("./assets/horatio.jpg");
  mySong = loadSound("./assets/track.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("OrangeRed");

  //resizing the image based on the canvas size
  proportion = max(width / myImage.width, height / myImage.height);
	myImage.resize (myImage.width * proportion, myImage.height * proportion);

	for(let i = 0; i <2000; i++)p[i] = new Particle();

//Texts:
  let t = createP('Yeahhhh!');
  t.position(50, 0);
  t.style('font-family','Courier Prime');
  t.style('font-size','40px');
  t.style('color','LawnGreen');
  let y = createP('// Click anywhere to listen');
  y.position(50, 60);
  y.style('font-family','Courier Prime');
  y.style('font-size','20px');
  y.style('font-style','italic');
  y.style('color','LawnGreen');
}

function draw() {
	for(const i of p) {
		i.update();
		i.show();
	}

//Alternative way to put the texts (not as nice tho):
  //    //yeah
  // push();
  // fill("LawnGreen");
  // let myText = "Yeahhhh!";
  // textSize(40);
  // textFont("Courier Prime");
  // text(myText,50,60);
  // pop();
  //    //click for sound
  // push();
  // fill("LawnGreen");
  // let myText2 = "// Click anywhere to listen";
  // textSize(20);
  // textStyle(ITALIC);
  // textFont("Courier Prime");
  // text(myText2,50,90);
  // pop();
}

class Particle {
	constructor() {
		this.init();
		this.sp = 200/ns;
		let length = random(10,30);
		this.maxFc = length / this.sp;
    this.pDiam = pSize * (1 + noise(this.x/ns, this.y/ns) * 0.5);
	}

	init() {
		this.x = random(width);
		this.y = random(height);
		this.fc = 0;
    let c = myImage.get(this.x, this.y); //get pixel color
		this.col = color(c);
		this.col.setAlpha(30); //set color transparency
	}

	update(){
		let angle = noise(this.x / ns, this.y / ns) * TAU * ns;
		let direction = createVector(cos(angle), sin(angle));
		this.x += direction.x * this.sp;
		this.y += direction.y * this.sp;
		this.fc ++;
		if(this.fc > this.maxFc)this.init();
	}

	show(){
		noStroke();
		fill(this.col);
    circle(this.x, this.y, this.pDiam);
	}
}

function mouseClicked() {
  if (!mySong.isPlaying()) { //plays only if the song isn't already playing, to avoid overlapping
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  proportion = max(width / myImage.width, height / myImage.height);
  myImage.resize(myImage.width * proportion, myImage.height * proportion);
}
