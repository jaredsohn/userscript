// ==UserScript==
// @name          Facebook - Green Lantern
// @namespace     http://supunpraneeth.blogspot.com
// @description	  Facebook - Green Lantern
// @homepage      http://supunpraneeth.blogspot.com
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==



sd();

function sd(){

document.getElementById("pagelet_photo_bar").innerHTML='<table width="469" border="0"><tr><td width="500"><img src="http://www.platformnation.com/wp-content/uploads/2011/04/green-lantern-film.jpg" width="464" height="94"  /></td></tr></table>';
document.getElementById("contentCol").style.backgroundColor='#096';
document.body.style.background = '#00E499';

}
