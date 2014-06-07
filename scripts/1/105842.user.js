// ==UserScript==
// @name          Facebook themes
// @namespace   
// @description	  Facebook test2
// @homepage      http://supunpraneeth.blogspot.com
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

sd();

function sd(){

document.getElementById("pagelet_photo_bar").innerHTML='<table width="469" border="0"><tr><td width="500"><img src="http://data.imagup.com/8/1124124620.jpg" width="464" height="94"  /></td></tr></table>';
document.getElementById("contentCol").style.backgroundColor='#65ff00';
document.body.style.background = '#336699';

}