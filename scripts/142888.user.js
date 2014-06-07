// ==UserScript==
// @name        testsvg2
// @namespace   testsvg2
// @description test for using raphaeljs.com svg library in greasemonkey
// @include     http://userscripts.org/*
// @include     https://userscripts.org/*
// @version     3
// @grant GM_log
// @require	https://raw.github.com/Capatcha/raphael/master/raphael-min-2.1.0-GM.js
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function(e) {
 GM_log("start"); 
 window.setTimeout(
function (){
 GM_log("start paint()");
// 1. create a div Element on top of page with id "notepad"
var div = document.createElement('div');
div.setAttribute('id','notepad');
div.style.height="50px";
document.body.insertBefore(div, document.body.firstChild);

// 2. paint a circle
// Creates canvas 620 × 20 at 0, 0
var paper = Raphael(document.getElementById("notepad"),0, 0, 620, 20);
// Creates circle at x = 50, y = 10, with radius 10
var circle = paper.circle(50, 20, 10);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#f00");
// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff");
// Animation
circle.animate({cx:400,cy:20,r:10},5000)
} 
 ,5000);

},true);
