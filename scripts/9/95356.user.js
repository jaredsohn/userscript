//
// ==UserScript==
// @name          KarmaIcon
// @namespace     http://habrahabr.ru/
// @description   Shows karma in favicon for habrahabr.ru
// @author        SkyManPHP
// @include       http://*.habrahabr.ru/
// @version       1.2.6
// ==/UserScript==
//
 
var c = document.createElement("canvas");
c.height = c.width = 16;
var cx = c.getContext("2d"); 

cx.beginPath();
cx.rect(0,3,18,11);
cx.fillStyle = "#6DA3BD";
cx.fill();

cx.font = "10px Normal Tahoma";
cx.fillStyle = "#fff";

var mark = document.querySelectorAll(".mark span");
cx.fillText(parseInt(mark[0].innerHTML), 0, 12, 16);

var oldicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
for(var i = 0; i < oldicons.length; i++) oldicons[i].parentNode.removeChild(oldicons[i]); 

var newicon = document.createElement("link");
newicon.setAttribute("rel","icon");
newicon.setAttribute("href",c.toDataURL());
document.querySelector("head").appendChild(newicon);

window.setTimeout(function() {window.clearTimeout(); window.location.reload() }, 120000);