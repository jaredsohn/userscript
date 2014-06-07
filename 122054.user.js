// ==UserScript==
// @name           Captcha Killer
// @namespace      Captcha
// @description    Cheat away with this handy tool ;)
// @version        1.1.0
// @include        http://www.facebook.com/* 
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