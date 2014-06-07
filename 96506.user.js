// ==UserScript==
// @name Dead Frontier Loot Map - for GMs
// @include http://fairview.deadfrontier.com/*
// @exclude http://fairview.deadfrontier.com/onlinezombiemmo/DF3D/DF3D_InventoryPage.php*
// ==/UserScript==

var img = document.createElement('img');
img.src = "http://i.imgur.com/txzj9.jpg";
img.style.position = 'absolute';
img.style.top = '200px';
document.body.appendChild(img);

var iWidth = img.width;
var iHeight = img.height;

var canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '200px';
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