// ==UserScript==
// @name        handwritten Gmail
// @namespace  	http://d.hatena.ne.jp/Pasta-K
// @description Gmailで手書きメッセージを送る
// @include		https://mail.google.com/mail/*
// ==/UserScript==

var mouseDown = false;
var penX = 0;
var penY = 0;
var penWidth = 5;
var ctx;
var color="#000000";
var CanvasOpened=false;

function draw(){
			if (!ctx){
				var canvas = document.getElementById('canvas');
				ctx = canvas.getContext('2d');
			}

			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(penX, penY, penWidth, 0, Math.PI*2, false);
			ctx.fill();
		}

		function onMouseMove(event){
			if (mouseDown){
				penX = event.clientX-15;
				penY = event.clientY-15;
				draw();
			}
		}

		function onMouseDown(b){
			mouseDown = b;
		}
		
		function setColor(c){
			color=c;
		}
		
function makecanvas(){
	if(document.getElementById("tr_image-dialog-external-image-tab-content")){
		
		CanvasOpened=true;
		
		var imagedialog=document.getElementById("tr_image-dialog-external-image-tab-content");
		var canvdiv=document.createElement("div");
		canvdiv.style.display="none";
		canvdiv.style.left="0px";
		canvdiv.style.top="0px";
		canvdiv.style.position="absolute";
		canvdiv.style.zIndex="100000000000";
		canvdiv.style.backgroundColor="white";
		
		var canvas=document.createElement("canvas");
		canvas.width=750;
		canvas.style.border="1px solid black";
		canvas.height=350;
		canvas.style.marginLeft="15px";
		canvas.style.marginTop="15px";
		canvas.style.backgroundColor="white";
		canvas.id="canvas";
		canvas.addEventListener("mousemove",function(event){return onMouseMove(event);},false);
		canvas.addEventListener("mouseout",function(){return onMouseDown(false);},false);
		canvas.addEventListener("mouseup",function(){return onMouseDown(false);},false);
		canvas.addEventListener("mousedown",function(){return onMouseDown(true);},false);
		
		colorsel=document.createElement("div");
		colorsel.id="colorselector";
		colorsel.innerHTML='<label><input checked type="radio" name="color" value="#000000" onclick="setColor(this.value)"/><span style="color:#000000;">■</span></label> <label><input type="radio" name="color" value="#993300" onclick="setColor(this.value)"/><span style="color:#993300;">■</span></label> <label><input type="radio" name="color" value="#333300" onclick="setColor(this.value)"/><span style="color:#333300;">■</span></label> <label><input type="radio" name="color" value="#003300" onclick="setColor(this.value)"/><span style="color:#003300;">■</span></label> <label><input type="radio" name="color" value="#003366" onclick="setColor(this.value)"/><span style="color:#003366;">■</span></label> <label><input type="radio" name="color" value="#000080" onclick="setColor(this.value)"/><span style="color:#000080;">■</span></label> <label><input type="radio" name="color" value="#333399" onclick="setColor(this.value)"/><span style="color:#333399;">■</span></label> <label><input type="radio" name="color" value="#333333" onclick="setColor(this.value)"/><span style="color:#333333;">■</span></label> <label><input type="radio" name="color" value="#800000" onclick="setColor(this.value)"/><span style="color:#800000;">■</span></label> <label><input type="radio" name="color" value="#FF6600" onclick="setColor(this.value)"/><span style="color:#FF6600;">■</span></label> <label><input type="radio" name="color" value="#808000" onclick="setColor(this.value)"/><span style="color:#808000;">■</span></label> <label><input type="radio" name="color" value="#008000" onclick="setColor(this.value)"/><span style="color:#008000;">■</span></label> <label><input type="radio" name="color" value="#008080" onclick="setColor(this.value)"/><span style="color:#008080;">■</span></label> <label><input type="radio" name="color" value="#0000FF" onclick="setColor(this.value)"/><span style="color:#0000FF;">■</span></label> <label><input type="radio" name="color" value="#666699" onclick="setColor(this.value)"/><span style="color:#666699;">■</span></label> <label><input type="radio" name="color" value="#808080" onclick="setColor(this.value)"/><span style="color:#808080;">■</span></label> <label><input type="radio" name="color" value="#FF0000" onclick="setColor(this.value)"/><span style="color:#FF0000;">■</span></label> <label><input type="radio" name="color" value="#FF9900" onclick="setColor(this.value)"/><span style="color:#FF9900;">■</span></label> <label><input type="radio" name="color" value="#99CC00" onclick="setColor(this.value)"/><span style="color:#99CC00;">■</span></label> <label><input type="radio" name="color" value="#339966" onclick="setColor(this.value)"/><span style="color:#339966;">■</span></label> <label><input type="radio" name="color" value="#33CCCC" onclick="setColor(this.value)"/><span style="color:#33CCCC;">■</span></label> <label><input type="radio" name="color" value="#3366FF" onclick="setColor(this.value)"/><span style="color:#3366FF;">■</span></label> <label><input type="radio" name="color" value="#800080" onclick="setColor(this.value)"/><span style="color:#800080;">■</span></label> <label><input type="radio" name="color" value="#999999" onclick="setColor(this.value)"/><span style="color:#999999;">■</span></label> <label><input type="radio" name="color" value="#FF00FF" onclick="setColor(this.value)"/><span style="color:#FF00FF;">■</span></label> <label><input type="radio" name="color" value="#FFCC00" onclick="setColor(this.value)"/><span style="color:#FFCC00;">■</span></label> <label><input type="radio" name="color" value="#FFFF00" onclick="setColor(this.value)"/><span style="color:#FFFF00;">■</span></label> <label><input type="radio" name="color" value="#00FF00" onclick="setColor(this.value)"/><span style="color:#00FF00;">■</span></label> <label><input type="radio" name="color" value="#00FFFF" onclick="setColor(this.value)"/><span style="color:#00FFFF;">■</span></label> <label><input type="radio" name="color" value="#00CCFF" onclick="setColor(this.value)"/><span style="color:#00CCFF;">■</span></label> <label><input type="radio" name="color" value="#993366" onclick="setColor(this.value)"/><span style="color:#993366;">■</span></label> <label><input type="radio" name="color" value="#C0C0C0" onclick="setColor(this.value)"/><span style="color:#C0C0C0;">■</span></label> <label><input type="radio" name="color" value="#FF99CC" onclick="setColor(this.value)"/><span style="color:#FF99CC;">■</span></label> <label><input type="radio" name="color" value="#FFCC99" onclick="setColor(this.value)"/><span style="color:#FFCC99;">■</span></label> <label><input type="radio" name="color" value="#FFFF99" onclick="setColor(this.value)"/><span style="color:#FFFF99;">■</span></label> <label><input type="radio" name="color" value="#CCFFCC" onclick="setColor(this.value)"/><span style="color:#CCFFCC;">■</span></label> <label><input type="radio" name="color" value="#CCFFFF" onclick="setColor(this.value)"/><span style="color:#CCFFFF;">■</span></label> <label><input type="radio" name="color" value="#99CCFF" onclick="setColor(this.value)"/><span style="color:#99CCFF;">■</span></label> <label><input type="radio" name="color" value="#CC99FF" onclick="setColor(this.value)"/><span style="color:#CC99FF;">■</span></label>';
		
		var input=document.createElement("input");
		input.type="button"
		input.width="100px";
		input.value="SetImage";
		input.addEventListener("click",function(){
			var data=document.getElementById('canvas').toDataURL();
			document.getElementById("tr_image-dialog-external-image-input").value=data;
			canvdiv.style.display="none";
			document.getElementById("tr_image-dialog-external-image-input").focus();
			CanvasOpened=false;
			ctx.clearRect(0, 0, 750, 350);
		},false);
		
		canvdiv.appendChild(canvas);
		canvdiv.appendChild(colorsel);
		canvdiv.appendChild(input);
		
		var opencanvas=document.createElement("a");
		opencanvas.textContent="draw image";
		opencanvas.id="drawimage";
		opencanvas.href="javascript:void(0);"
		opencanvas.addEventListener("click",function(){
			canvdiv.style.display="block";
			CanvasOpened=true;
		},false);
		imagedialog.appendChild(opencanvas);
		document.body.appendChild(canvdiv);
	}
}

(function(){
	setInterval(function(){
		if(!CanvasOpened&&!document.getElementById("drawimage")){
			makecanvas();
		}
	},10);
})();
