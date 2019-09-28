var img;
var canvas;
var canvasSize = 1700;
var ratios = [
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377],
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233],
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
  // [1, 1, 2, 3, 5, 8, 13, 21, 34],
  // [1, 1, 2, 3, 5, 8, 13, 21],
  // [1, 1, 2, 3, 5, 8, 13],
  // [1, 1, 2, 3, 5, 8],
  // [1, 1, 2, 3, 5],
  // [1, 1, 2, 3],
  // [1, 1, 2],
  // [1, 1]

  // [1,2,3,1,2,3,1,2,3],
  // [1,3,2,1,3,2,1,3,2],
  // [2,1,3,2,1,3,2,1,3],
  // [2,3,1,2,3,1,2,3,1],
  // [3,1,2,3,1,2,3,1,2],
  // [3,2,1,3,2,1,3,2,1]

  // [1, 144, 1, 89, 2, 55, 3, 34, 5, 21, 8, 13, 13, 8, 21, 5, 34, 3, 55, 2, 89, 1, 144, 1],
  // [1, 89, 1, 55, 2, 34, 3, 21, 5, 13, 8, 8, 13, 5, 21, 3, 34, 2, 55, 1, 89, 1],
  // [1, 55, 1, 34, 2, 21, 3, 13, 5, 8, 8, 5, 13, 3, 21, 2, 34, 1, 55, 1],
  [1, 34, 1, 21, 2, 13, 3, 8, 5, 5, 8, 3, 13, 2, 21, 1, 34, 1],
  [1, 21, 1, 13, 2, 8, 3, 5, 5, 3, 8, 2, 13, 1, 21, 1],
  [1, 13, 1, 8, 2, 5, 3, 3, 5, 2, 8, 1, 13, 1],
  [1, 8, 1, 5, 2, 3, 3, 2, 5, 1, 8, 1],
  [1, 5, 1, 3, 2, 2, 3, 1, 5, 1],
  [1, 3, 1, 2, 2, 1, 3, 1],
  [1, 2, 1, 1, 2, 1],
  [1, 1, 1, 1]

];
var unitWidth = 0;
var currentX = 0;
var initialImageX = 1050;
var currentImageX = initialImageX;

function preload() {
  img = loadImage("images/gibraltar-point-3.jpg");
  // img = createVideo("../videos/343459972.mp4");
  // img.loop();
  // img.hide();
}

function setup() {
  canvas = createCanvas(canvasSize, canvasSize);

  layerNumber = 0;
  // blendMode(MULTIPLY);
  // blendMode(OVERLAY);
  // blendMode(SOFT_LIGHT);

  // var randomOpacity = random(255);
  // tint(255, randomOpacity);

  ratios.forEach(function(layer) {
    layerNumber++;
    var randomOpacity = 50 + random(100);
    if (layerNumber % 2 == 1) {
      blendMode(MULTIPLY);
    } else {
      blendMode(SOFT_LIGHT);
      randomOpacity += 70;
    }
    if (layerNumber == 1) {
      randomOpacity = 250;
    }
    tint(255, randomOpacity);
    drawLayer(layer);
  });
}

function mouseClicked() {
  saveImage();
}

function drawLayer(layer) {
  var sectionNumber = 0;
  currentX = 0;
  currentImageX = initialImageX + random(240);

  unitWidth = canvasSize / layer.reduce(add, 0);

  layer.forEach(function(ratiosize) {
    drawSection(sectionNumber, ratiosize);
    sectionNumber++;
  });
}

function drawSection(sectionNumber, ratiosize) {
  // alert(sectionNumber + ': ' + ratiosize);
  sectionWidth = ratiosize * unitWidth;

  if (sectionNumber % 2 == 0) {
    section = image(img, currentX, 0, sectionWidth, canvasSize, currentImageX, 0, sectionWidth, canvasSize);
    currentImageX += sectionWidth;
  } else {
    section = image(img, -currentX - sectionWidth, 0, sectionWidth, canvasSize, currentImageX - sectionWidth, 0, sectionWidth, canvasSize);
    currentImageX -= sectionWidth;
  }

  currentX += sectionWidth;

  scale( -1, 1);

  return section;
}

function saveImage() {
  var now = new Date();
	save('p5js-' + now.toString() + '.jpg');
}

function add(a, b) {
  return a + b;
}
