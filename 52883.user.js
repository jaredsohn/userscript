// ==UserScript==
// @name           Tw map bewegen
// @namespace      TW
// @description    kaart bewegen met toetsenbod
// @include        http://nl*.tribalwars.nl/game.php*screen=map*
// ==/UserScript==

(function(){
var imgs = document.getElementsByTagName("img");
var left = "113";
var right = "100";
var up = "122";
var down = "115";
document.addEventListener("keypress",function(event){
	var key = event.which.toString();
	switch(key){
		case left: location.href = "javascript:startMapScroll('west')"; break;
		case right: location.href = "javascript:startMapScroll('east')"; break;
		case up: location.href = "javascript:startMapScroll('north')"; break;
		case down: location.href = "javascript:startMapScroll('south')"; break;
		default: break;
	}
},false);
})();