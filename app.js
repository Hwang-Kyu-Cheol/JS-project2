const selectColors = document.querySelectorAll(".js-color"),
    canvas = document.querySelector("#js-canvas"),
    range = document.querySelector("#js-range"),
    mode = document.querySelector("#js-btnFill");
    clear = document.querySelector("#js-btnClear");
    ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;    

function paintTarget(target){
    target.classList.add("css-colorPaint");
}

function paintLine(target){
    const color = target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleClick(event){
    for(let i = 0; i<selectColors.length; i++){
        if(selectColors[i].classList.contains("css-colorPaint")){
            selectColors[i].classList.remove("css-colorPaint");
            break;
        }
    }
    paintTarget(event.target);
    paintLine(event.target);
}

function handleMouseEnter(event){
    event.target.classList.add("css-colorMouseEnter")
}

function handleMouseLeave(){
    event.target.classList.remove("css-colorMouseEnter");
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    painting = false;
}

function onMouseLeave(){
    painting = false;
}

function onClick(event){
    if(fill){
        ctx.fillRect(0, 0, 400, 400);  
    } else {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, 1 * Math.PI, true);
        ctx.stroke();
    }
}

function hadleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeClick(event){
    const target = event.target;
    if(fill){
        fill = false;
        target.innerText = "FILL";
    } else {
        fill = true;
        target.innerText = "PAINT";
    }
}

function handleClearClick(){
    ctx.clearRect(0, 0, 400, 400);
}

function init(){
    selectColors.forEach(function(selectColor){
        selectColor.addEventListener("click", handleClick);
        selectColor.addEventListener("mouseenter", handleMouseEnter);
        selectColor.addEventListener("mouseleave", handleMouseLeave);
    });

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", onMouseLeave);
        canvas.addEventListener("click", onClick);
    }

    if(range){
        range.addEventListener("input", hadleRangeChange);
    }

    if(mode){
        mode.addEventListener("click", handleModeClick);
    }

    if(clear){
        clear.addEventListener("click", handleClearClick);
    }
}

init();