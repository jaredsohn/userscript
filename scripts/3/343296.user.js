// ==UserScript==
// @name        DotD Infoboard (only panel)
// @namespace   tag://kongregate
// @description Infoboard and more for DotD on Kong
// @author      Chillyskye
// @version     1.0.1
// @date        19.07.2013
// @grant       none
// @include     http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// ==/UserScript==

function setWidth(id){
    var width = 1064;
	var el = document.getElementById(id);
	var outer = 253; 
	if (id == "flashframecontent") {
	   outer = 0;
	}
	el.style.width = width + outer + "px";
}

function doStuff() {

var chatElements = ["maingame","maingamecontent","flashframecontent"];
chatElements.forEach(function(id){setWidth(id)});
    
var div = document.createElement('div');
div.style.width = "250px";
div.style.position = "relative";
div.style.height = "665px";
div.style.marginRight = "3px";
div.style.cssFloat = "left";
div.style.top = "26px";
div.style.styleFloat = "left";

var helper = document.createElement('iframe');
helper.style.width = "250px";
helper.style.height = "690px";
helper.style.border = "0";
helper.src = "http://chillyskye.dk/dotd/index.php?check_query_string=true";

div.appendChild(helper);
var maingamecontent = document.getElementById('maingamecontent');
var flashframecontent = document.getElementById('flashframecontent');
flashframecontent.style.cssFloat = "left";
flashframecontent.style.styleFloat = "left";
maingamecontent.insertBefore(div, flashframecontent);
}

setTimeout(doStuff,3000);