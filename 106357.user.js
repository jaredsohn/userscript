// ==UserScript==
// @name           Fuck 8000 wall
// @author         wizarkid
// @version        2011-07-08
// @namespace      http://userscripts.org/scripts/show/106357
// ==/UserScript==

if(!window.addGlobalStyle){
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
}
if(!window.canvasLoading){
function canvasLoading(id, spokes, inter){
	var t = this;
	var ctx, drawIntervalID;
	t.canvas = document.getElementById(id);
	t.init = function(){
		if (t.canvas.getContext){  
			ctx = t.canvas.getContext('2d');
			ctx.translate(15,15);
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			t.draw();
			return drawIntervalID;
		}
	}				
	t.draw = function(){
		ctx.clearRect(-15,-15,30,30);
		ctx.rotate(Math.PI*2/spokes);
		for (var i=0; i<spokes; i++) {
			ctx.rotate(Math.PI*2/spokes);
			var alpha = i/spokes+.3;
			ctx.strokeStyle = "rgba(120,120,120,"+ alpha +")";
			ctx.beginPath();
			ctx.moveTo(0,7);
			ctx.lineTo(0,14);
			ctx.stroke();
		}
	}				
	t.init();				
}
}

if(!window.addCanvas){
function addCanvas(){
var body, myCanvas;
body = document.getElementsByTagName("body")[0];
	if (body) {
	    myCanvas = document.createElement('canvas');
		myCanvas.setAttribute('width', '30px');
		myCanvas.setAttribute('height', '30px');
		myCanvas.setAttribute('id', 'mycanvas');
		myCanvas.setAttribute('class', 'mui_loading');
	    body.appendChild(myCanvas);
	}	
}
}

addGlobalStyle(
'@-webkit-keyframes spin{' +
'	0%{ -webkit-transform: rotate(0) }' +
'	100%{-webkit-transform: rotate(360deg)}}' +
'@-moz-keyframes spin{' +
'	0%{ -moz-transform: rotate(0) }' +
'	100%{-moz-transform: rotate(360deg)}}' +
'.mui_loading{' +
'	-webkit-animation: spin 1.8s linear infinite;' +
'	-moz-animation: spin 1.8s linear infinite;' +
'	width:30px;' +
'	height:30px;' +
'	margin:80px auto 0;}'
);


var btn = document.getElementById("btnVisit");
if (btn){
	document.title = "正在连接...";
	document.getElementById("Form1").style.display = "none";
	addCanvas();
	new canvasLoading('mycanvas', 10, 60);
	btn.click();
}

