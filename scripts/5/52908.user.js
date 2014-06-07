// ==UserScript==
// @name         DS Karte mit Pfeiltasten bewegen

// @namespace      Die St�mme

// @description    Erm�glicht das Bewegen der Karte mit den Pfeiltasten

// @include        http://de*.die-staemme.de/game.php*screen=map*

// ==/UserScript==

(
function(){

var imgs = document.getElementsByTagName("img");

var left = "97";

var right = "100";

var up = "119";

var down = "115";

var map_left = "65";
var map_right = "68";
var map_up = "87";
var map_down = "83";
var x = document.getElementById('inputx').value;
var y = document.getElementById('inputy').value;
var x_up = x*1+45;
var x_down = x*1-45;
var y_up = y*1+45;
var y_down = y*1-45;
var x_up = x_up.toString();
var x_down = x_down.toString();
var y_up = y_up.toString();
var y_down = y_down.toString();
var y = y.toString();
var x = x.toString();
document.addEventListener("keypress",function(event){
	
var key = event.which.toString();
	
switch(key){
		
case left: location.href = "javascript:startMapScroll('west')";
 break;

case right: location.href = "javascript:startMapScroll('east')";
 break;

case up: location.href = "javascript:startMapScroll('north')"; 
break;
		
case down: location.href = "javascript:startMapScroll('south')"; 
break;

case map_left: location.href = "http://de14.die-staemme.de/game.php?village=189445&screen=map&x="+x_down+"&y="+y;
break;
case map_right: location.href = "http://de14.die-staemme.de/game.php?village=189445&screen=map&x="+x_up+"&y="+y; 
break;
case map_up: location.href = "http://de14.die-staemme.de/game.php?village=189445&screen=map&x="+x+"&y="+y_down;
break; 
case map_down: location.href = "http://de14.die-staemme.de/game.php?village=189445&screen=map&x="+x+"&y="+y_up; 
break;
		
default: 
break;
	
}

},false);
})();