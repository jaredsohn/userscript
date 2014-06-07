// ==UserScript==
// @name           Captcha Killer koc 
// @namespace      http://localhost
// @description    fuera control de actividad
// @author         HoboBobo , y estrou
// @version        1.0.0
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
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