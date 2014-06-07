// ==UserScript==
// @name           ICHC Cam Zoomer
// @namespace      no u
// @include        http://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// @version        1.1
// ==/UserScript==
LoadMe();

var popbutton;
var menu;
var zoomed = false;

function buildMenu(){
if (zoomed){UnZoom();return;}

menu.innerHTML = "";
var arr = document.getElementById("cams").childNodes;
var count=0;
var tr = menu.appendChild(document.createElement("tr"));
for (var i = 0; i <15;i++){
var j = i+1;
var test = "slot" + j.toString();
if (document.getElementById(test).childNodes.length != 0){
if (document.getElementById(test).firstChild.nodeName == "OBJECT"){
count++;
var td = document.createElement("td");
td.name = "slot" + count;
td.id = "slot" + count;
td.innerHTML = "Slot " + count;
td.width = 40;
td.height = 16;
td.setAttribute("style", "cursor:pointer;margin-left:8px;font-weight:bold;color:black");
tr.appendChild(td);
td.addEventListener("click", Zoom,true); 
td.addEventListener("mouseover", OMO,true); 
td.addEventListener("mouseout", OMOut,true); 
}
}
}

function clr(){
document.getElementById("menudiv").style.display = "none"
}

function OMO(e){
e.target.style.backgroundColor = "goldenrod";
}

function OMOut(e){
e.target.style.backgroundColor = "lightgray";
}

if (count == 0) {
var tr = document.createElement("tr");
var td = document.createElement("td");
td.name = "slot " + count;
td.id = "slot " + count;
td.innerHTML = "No Cams!"
td.width = 80;
td.height = 16;
tr.appendChild(td);
menu.appendChild(tr);
setTimeout(clr,3000);
}
  document.getElementById("menudiv").style.display = "inline-table";
}

function UnZoom(){
try {
var a = document.getElementById("slotzoom")
document.getElementById("cams").removeChild(a);
}
catch (err){}
zoomed = false;
popbutton.innerHTML = "Zoom Cam";
popbutton.style.backgroundColor = "";
}

function Zoom(slot){
  document.getElementById("menudiv").style.display = "none";
var a = document.getElementById(slot.target.id).cloneNode(true);
var b = a.childNodes[0];
document.getElementById("cams").appendChild(a);
a.id = "slotzoom";
a.setAttribute("style", "top: 0px; left: 0px; width: 458px; height: 345px; visibility: visible; ");
b.setAttribute("width",458);
b.setAttribute("height",345);
zoomed =true;
popbutton.innerHTML = "Un Zoom"
popbutton.style.backgroundColor = "red";
}

function LoadMe(){

var menudiv = document.createElement("div");
menudiv.id = "menudiv";
menudiv.style.display = "inline-table";
menudiv.verticalAlign = "middle";
menudiv.innerHTML = '<table cellspacing=0 cellpadding=3 bgcolor=lightgray verticalAlign=middle>\
  <tr><td>\
    <table id = "menutable" cellspacing=0 cellpadding=1>\
     </table>\
  </td></tr>\
   </table>';

popbutton = document.createElement("span");
popbutton.setAttribute("style", "cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color:goldenrod");
popbutton.innerHTML = "Zoom Cam";
document.getElementById("lblDynamicFootLink").appendChild(popbutton);
document.getElementById("lblDynamicFootLink").appendChild(menudiv);
popbutton.addEventListener("click", buildMenu,true); 
menu =  document.getElementById("menutable");
}




