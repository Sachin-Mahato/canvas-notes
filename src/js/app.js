
import { drawCircle, getDistance} from "../utils/utils.js";

/**
 * @type {HTMLCanvasElement} canvas
 */
var canvas = document.body.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var navbar = document.body.querySelector(".navbar");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var radius = 60;
var circle = {
    x: null,
    y: null,
    isDragging: false,
}

navbar.addEventListener("click", handleNavbarClick);

function handleNavbarClick() {
    canvas.addEventListener("click", handleCanvasClick);
}
/**
 * 
 * @param {MouseEvent} e 
 */
function handleCanvasClick(e) {
    // Remove the canvas click listener after it is used
    canvas.removeEventListener("click", handleCanvasClick);
    circle.x = e.clientX;
    circle.y = e.clientY; 
    drawCircle(ctx, circle, radius);

    // Set up the circle click detection
    canvas.addEventListener("mousedown", function (evt) {
        console.log("mousedown")
        const rect = canvas.getBoundingClientRect();
        let cX = evt.clientX - rect.left;
        let cY = evt.clientY - rect.top;
        if (getDistance(circle.x, circle.y, cX, cY, radius)) {
            circle.isDragging = true;
        } else {
            // isDragging = false;
        }
    });

    canvas.addEventListener("mousemove", () => {
        if (circle.isDragging) {
            console.log("hello")
        }
    })

    // canvas.addEventListener("mouseup", () => {
    //     circle.isDragging = false;
    // })
}




