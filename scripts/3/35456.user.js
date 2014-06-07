// ==UserScript==
// @name           Captcha Killer
// @namespace      http://localhost
// @description    Tired of the Captcha? Cheat away with this handy tool ;)
// @author         HoboBobo
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php* 
// @exclude
// ==/UserScript==

var  contents = document.getElementById("contents");
var link;
if(contents){
	if(contents.textContent.match('.*(Routine Check).*')){
		link = contents.getElementsByTagName("a")[1].href;
		setTimeout(Captcha,250);//use a delay
		
	}
}
function Captcha(){
	location.href = link;
}
