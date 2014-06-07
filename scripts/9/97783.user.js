// ==UserScript==
// @name Dead Frontier Loot Map - for GMs
// @include http://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=21*
// ==/UserScript==

var img = document.createElement('img');
img.src = "http://i443.photobucket.com/albums/qq154/ZEZO231/NEloot2-1.png";
img.style.position = 'absolute';
img.style.top = '110px';
document.body.appendChild(img);

var iWidth = img.width;
var iHeight = img.height;

var canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '110px';
canvas.style.cursor = 'pointer';
canvas.width = iWidth;
canvas.height = iHeight;
document.body.appendChild(canvas);

var oCtx = canvas.getContext("2d");
oCtx.drawImage(img,0,0);
oCtx.fillStyle = "transparent";
oCtx.fillRect(0,0,iWidth,iHeight);
oCtx.beginPath();
oCtx.strokeStyle = "rgb(255,0,0)";
oCtx.lineWidth = "4";
oCtx.lineJoin = "round";
oCtx.lineCap = "round";

canvas.addEventListener('mousedown',function(e) {
	bMouseIsDown = true;
	iLastX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
	iLastY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
},false);

canvas.addEventListener('mouseup',function() {
	bMouseIsDown = false;
	iLastX = -1;
	iLastY = -1;
},false);

canvas.addEventListener('mousemove',function(e) {
	if (bMouseIsDown) {
		var iX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
		var iY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
		oCtx.moveTo(iLastX, iLastY);
		oCtx.lineTo(iX, iY);
		oCtx.stroke();
		iLastX = iX;
		iLastY = iY;
	}
},false);