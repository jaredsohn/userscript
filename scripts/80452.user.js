// ==UserScript==
// @name           Google Wobble
// @namespace      googleWobble
// @include        http://www.google.com/*
// ==/UserScript==

var tbls = document.getElementsByTagName("table");
var tbl = tbls[0];

var title = document.getElementById('logo');
    
var speed = 0.25;
var angle = 0;
setInterval(function(){
	if(angle > 0){ speed -= 0.01; }
	else if(angle < 0){ speed += 0.01; }
	angle += speed;
	tbl.setAttribute('style', '-moz-transform: rotate(' + angle + 'deg);');
	title.setAttribute('style', '-moz-transform: rotate(' + (0 - angle) + 'deg);');
}, 10);