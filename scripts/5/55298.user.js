// ==UserScript==
// @name          Yahoo Mail Ad Blocker
// @namespace     mailto:novemliu@gmail.com
// @description   Hidden the trouble advertisements in yahoo mail
// @include       http://*
// ==/UserScript==

var currUrl = document.location.href;
alert(currUrl);
if(currUrl.indexOf('welcome'){
	alert(currUrl);
	init();
}

//------------------------------------------------------
function init(){
	var lrecad = document.getElementById('lrecad');
	if(lrecad){
		lrecad.style.display = 'none';
	}
}