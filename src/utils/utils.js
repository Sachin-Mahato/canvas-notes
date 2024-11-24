/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {object} circle 
 * @param {number} radius 
 * 
 * @return {void}
 */
function drawCircle(ctx, circle, radius) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "##1b1b1f";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath()
}
/**
 * @param {number} circleX 
 * @param {number} circleY 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} radius 
 * @returns {boolean}
 */
function getDistance(circleX, circleY, mouseX, mouseY, radius) {
    var dx = circleX - mouseX;
    var dy = circleY - mouseY;
    return (dx * dx + dy * dy) < (radius * radius);
}



/**
 *@param {HTMLCanvasElement} 
 * @param {MouseEvent} event 
 * @return {object}
 */
function updatePosition(canvas,event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}


export {
    drawCircle,
    getDistance,
    updatePosition
}
