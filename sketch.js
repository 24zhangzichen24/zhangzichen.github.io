// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let previous;
let current;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create the p5.Framebuffer objects.
  previous = createFramebuffer({ format: FLOAT });
  current = createFramebuffer({ format: FLOAT });

  describe(
    'A multicolor box drifts from side to side on a white background. It leaves a trail that fades over time.'
  );
}

function draw() {
  // Swap the previous p5.Framebuffer and the
  // current one so it can be used as a texture.
  [previous, current] = [current, previous];

  // Start drawing to the current p5.Framebuffer.
  current.begin();

  // Paint the background.
  background(255);

  // Draw the previous p5.Framebuffer.
  // Clear the depth buffer so the previous
  // frame doesn't block the current one.
  push();
  tint(255, 250);
  image(previous, -50, -50);
  clearDepth();
  pop();

  // Draw the box on top of the previous frame.
  push();
  let x = 25 * sin(frameCount * 0.01);
  let y = 25 * sin(frameCount * 0.02);
  translate(x, y, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial();
  box(12);
  pop();

  // Stop drawing to the current p5.Framebuffer.
  current.end();

  // Display the current p5.Framebuffer.
  image(current, -50, -50);
}