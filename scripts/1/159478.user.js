// ==UserScript==
// @name        Compass
// @namespace   /alphabounce/
// @description Alphabounce direction show
// @include     http://www.alphabounce.com/
// @version     1
// ==/UserScript==
var glob=document.getElementById("global");
var cont=document.createElement("div");
var myx=0,myy=0;
var validcoords=false;
cont.setAttribute("style","height:120px;width:200px;position:absolute;top:100px;right:0px;border:2px solid black;background-color:black;color:white;text-align:center;");
cont.innerHTML+='<h2>Compass</h2>Source coordinates:<br><input id="mx" value="0" style="width:50px;"><input id="my" value="0" style="width:50px;"><br>Target coordinates:<br><input id="tx" value="0" style="width:50px;"><input id="ty" value="0" style="width:50px;"><br><button id="compassbutton">Show</button>';
glob.appendChild(cont);  
cont=document.createElement("div");
cont.setAttribute("id","compass");   
cont.setAttribute("style","z-index:1;position:absolute;margin-left:0px;margin-top:66px;background.color:red;width:418px;height:378px;");
cont.innerHTML='<canvas width="418" height="378" id="compasscanvas"></canvas>';  
document.getElementById("center").appendChild(cont); 
document.getElementById("client").setAttribute('style','z-index:2;'); 
document.getElementById("compassbutton").addEventListener("click", function() {
  var dy = document.getElementById("ty").value - document.getElementById("my").value;
  var dx = document.getElementById("tx").value - document.getElementById("mx").value; 
  if (dy==0 && dx==0)
    return;
  var mult=1;
  dx*=20;
  dy*=18;
  if (Math.abs(dx)>Math.abs(dy))
    mult=209/Math.abs(dx);
  else
    mult=189/Math.abs(dy);
  var theta = Math.atan2(dy, dx);     
  var ctx= document.getElementById("compasscanvas").getContext("2d");   
  ctx.clearRect ( 0 , 0 , 418 , 378 );
  ctx.beginPath();     
  ctx.strokeStyle = 'red';
  ctx.moveTo(209,189);
  ctx.lineTo(209+dx*mult,189+dy*mult);
  ctx.lineWidth = 3; 
  ctx.stroke();
}, false);

