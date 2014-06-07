// ==UserScript==
// @name           Facebook App Full Screen
// @author         anonymous
// @include        http://apps.facebook.com/*
// @include        https://apps.facebook.com/*
// @version        1.0
// ==/UserScript==

globalContainer = document.getElementById('globalContainer'); 
var hideAd = function(){
	var canvas = document.getElementById('iframe_canvas'),
		theForm = canvas.previousSibling,
		app = theForm.action,
		parser = document.createElement('a'),
		r = 0;
	parser.href = app;
	for(var i=0,l=parser.host.length;i<l;i++){
		r+=parser.host.charCodeAt(i);
	}
	if(r<((1<<9)+(3<<6))){
		document.getElementById('rightCol').style.display = 'none'; 
		document.getElementById('contentArea').style.padding = '10px';
	}	
}
globalContainer.addEventListener("DOMSubtreeModified", hideAd, true);
hideAd();