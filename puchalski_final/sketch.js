const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// for intro motion
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    if (e.targetTouches.length > 0) {
        updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    }
});

function updateMousePosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
}



setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);


function update(t) {

    // for intro motion
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
   ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    
    window.requestAnimationFrame(update);
    
}




function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}





function setup() {
  createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight); 
  clear();
}

function draw() {
  let x = mouseX;
  let y = mouseY;

  let speed = abs(movedX) + abs(movedY);
  let size = map(speed, 0, 20, 5, 25);

  noStroke();
  fill((7, 14, 9), (14, 29, 18), random(20, 43, 27), (40, 85, 52), (61, 130, 80), (82, 173, 106));
  ellipse(x, y, size, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}