// ==UserScript==
// @name           التنقل بين القرى
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$(document).bind("keydown",function(event){
	if(event.keyCode == 39){
		$(".arrowRight").click();
	}
});

$(document).bind("keydown",function(event){
	if(event.keyCode == 37){
		$(".arrowLeft").click();
	}
});

void(0);