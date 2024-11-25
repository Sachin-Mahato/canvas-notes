/**
 * @type {HTMLCanvasElement}
 */

var canvas = document.body.querySelector("#canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext("2d");
var navbar = document.body.querySelector(".navbar");
var mode = null;
var circles = [];
var isDraggable = false;
var draggingCircle = null;
var radius = 70;
var scale = 1;

canvas.addEventListener("pointerdown", (evt) => {
    const rect = canvas.getBoundingClientRect();
    const x = (evt.clientX - rect.left) / scale;
    const y = (evt.clientY - rect.top) / scale;
    if (mode == "draw") {
        circles.push({x,y,radius: radius})
        drawCircle();
        mode = "";
    } else if (mode == "") {
        // Find the circle the cursor is closest to, by calculating distance from cursor to circle center
        draggingCircle = circles.find((circle) => Math.hypot(circle.x - x, circle.y - y) <= circle.radius)
        if (draggingCircle) {
            console.log("draggingCircle", draggingCircle)
            isDraggable = true;
        } else {
            console.log("no circles under the cursor")
        }
    }
})

canvas.addEventListener("pointermove", (evt) => {
    if (isDraggable && draggingCircle) {
        const rect = canvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) / scale;
        const y = (evt.clientY - rect.top) / scale;

        draggingCircle.x = x;
        draggingCircle.y = y;
        drawCircle();
    }
})

canvas.addEventListener("pointerup", () => {
    isDraggable = false;
    draggingCircle = null;
})

canvas.addEventListener("pointerleave", () => {
    isDraggable = false;
    draggingCircle = null;
})

navbar.addEventListener("click", () => {
    mode = "draw"
})

/**
 * Clears the canvas and redraws all circles stored in the circles array.
 * @function drawCircle
 */
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#1b1b1b";
    ctx.lineWidth = 4;
    
    circles.forEach((circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.stroke();
    });
}
