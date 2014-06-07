// ==UserScript==
// @name           FBHW - RPSLS Refresh
// @namespace      http://localhost
// @description    To be used in conjunction with an automatic RPSLS script.//
// @author	   KidFiercer
// @version        1.0
// @include        http://hobowars.com/fb/game.php?*cmd=city_hall&action=rpsls*
// @include        http://www.hobowars.com/fb/game.php?*cmd=city_hall&action=rpsls* 
// @exclude
// ==/UserScript==


var menu = document.getElementById('menu');
var  contents = document.getElementById("contents");
var livingArea = menu.firstChild;
var link = livingArea.href;
var beg;

var random = (Math.round((Math.random()*2000)+1500))
if(contents){
	if(contents.textContent.match('City Hall')){
		beg = link+'city_hall&action=rpsls';
		setTimeout(dobeg,random);//use a delay
		//location.href = link;//or no delay
	}
}
function dobeg(){
	location.href = beg;
}
