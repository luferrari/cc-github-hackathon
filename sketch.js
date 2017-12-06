var cinzel;
var message = 'Merry Treemas!';

function preload() {
  cinzel = loadFont('./assets/CinzelDecorative-Black.ttf');
}

var mic;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  var vol = mic.getLevel();
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(166, 217, 247);
  fill(251, 251, 242);

  tree(
    width / 6,
    2.325 * height / 6,
    3,
    color(142, 202, 48),
    color(202, 231, 156),
    width / 3,
    false
  );
  tree(
    5 * width / 6,
    2.325 * height / 6,
    3,
    color(142, 202, 48),
    color(202, 231, 156),
    width / 3,
    false
  );

  fill(251, 251, 242);
  ellipse(width / 2, height * 1.1, width * 2.5, height);

  tree(
    width / 2,
    height / 3.5,
    4,
    color(71, 147, 23),
    color(152, 216, 112),
    width / 1.5,
    true
  );

  var vol = mic.getLevel();

  fill(255, 249, 79);
  push();
  translate(width / 2, height / 3.2);
  rotate(125 + (1 + vol) * 180);
  angleMode(RADIANS);
  star(0, 0, width / 20 * (1 + vol), width / 50 * (1 + vol), 5);
  pop();

  var o = map(vol, 0.25, 0.5, 0, 255);
  fill(223, 41, 53, o);
  textAlign(CENTER);
  textFont(cinzel);
  textSize(width / 10);
  text(message, width / 2, height / 8);

  //DEBUG();
}



function tree(x, y, size, from, to, dims, mouth) {
  angleMode(DEGREES);

  noStroke();
  push();
  translate(x, y + dims / 10);

  fill(122, 84, 46);
  rect(-dims / 15, size * 2 + dims / 2, dims / 7.5, size * 2 + dims / 5, dims / 50);

  scale(0.85, 1);
  for (var i = 1; i < size + 1; i++) {
    var j = map(i, 1, size, 0, 1);
    fill(lerpColor(from, to, j));
    scale(1 - j * 0.25, 1 - j * 0.25);
    arc(0, size * 10 - j * 100 * size / 5, dims, dims, 45, 135, PIE);
  }

  var vol = mic.getLevel();
  var blink = map(vol, 0, 0.625, dims / 6, dims / 50);
  var sing = map(vol, 0, 0.625, dims / 20, dims / 1.5);

  fill(31);
  push();
  ellipse(-dims / 10, dims / 3 + vol * 20, dims / 10, blink);
  ellipse(dims / 10, dims / 3 + vol * 20, dims / 10, blink);
  pop();

  if (mouth) {
    arc(0, dims / 2.125, dims / 5, sing, 0, 180, CHORD);
  }

  pop();
  pop();
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}



function DEBUG() {
  var vol = mic.getLevel();
  var small = width / 20;
  var big = width;
  var size = map(vol, 0, 1, small, big);

  stroke(0);
  fill(255);
  rect(-1, height - 12, size, height);
  noStroke();
  fill(0);
  textFont('Arial');
  textAlign(LEFT);
  textSize(12);
  text(vol.toFixed(8), 0, height - 13);
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// PALETTE
// non-photo blue       166, 217, 247
// tuscan brown         122, 84, 46
// floral white         251, 251, 242
// medium spring bud    202, 231, 156
// yellow-green         142, 202, 48
// slimy green          71, 147, 23
// pistachio            152, 216, 112
// rose madder          223, 41, 53