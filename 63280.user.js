// ==UserScript==
// @name           full width msnbc
// @namespace      msnbc
// @include        http://www.msnbc.msn.com/id/*
// ==/UserScript==


var divs = document.getElementsByTagName("div");

var i = 0;
var length = divs.length;

document.getElementById('nav-left').style.display = 'none';

for(;i<length;i++){
	var div = divs[i];
	var className = div.className;

	if( className == 'mR165' || className == 'p12' || className == 'w649 fL'){
		div.style.width = '100%';
	}
		
	if( className == 'WCCol w300 fR clrR' ){
		div.style.display = 'none';
	}	
}
