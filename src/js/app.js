/**
 * @type {HTMLCanvasElement}
 */

/**
 * @type {HTMLCanvasElement}
 */

var canvas = document.body.querySelector("#canvas");
canvas.height = innerHeight;
canvas.width = innerWidth;
var navbar = document.body.querySelector(".navbar");
var ctx = canvas.getContext("2d");
var isDragging = false;
var circles = [];
var mode = "";
var draggedCircle = null;
var scale = 1;

// Handle mousedown events
canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;

    if (mode === "circle") {
        // Add a new circle where the user clicks
        circles.push({ x, y, radius: 60 });
        drawCanvas();

        // Reset mode to avoid accidental multiple circles
        mode = "";
    } else if (mode === "") {
        // Check if the user clicked on an existing circle
        draggedCircle = circles.find((circle) => Math.hypot(circle.x - x, circle.y - y) <= circle.radius);

        if (draggedCircle) {
            isDragging = true;
        }
    }
});

// Handle mousemove events
canvas.addEventListener("mousemove", (event) => {
    if (draggedCircle && isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / scale;
        const y = (event.clientY - rect.top) / scale;

        // Update the dragged circle's position
        draggedCircle.x = x;
        draggedCircle.y = y;

        // Redraw the canvas
        drawCanvas();
    }
});

// Handle mouseup events
canvas.addEventListener("mouseup", () => {
    isDragging = false;
    draggedCircle = null;
});

// Draw all elements on the canvas
function drawCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all circles
    circles.forEach((circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    });
}

// Handle navbar clicks to enable circle drawing
navbar.addEventListener("click", () => {
    mode = "circle"; // Enable circle drawing mode
});
