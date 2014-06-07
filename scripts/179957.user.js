// ==UserScript==
// @name        Remove wikipedia left panel
// @namespace   http://userscipts.org/users/tomthebomb
// @description This script removes the left hand panel (icon, navigation, languages, etc...) & reclaims the space so articles span the width of the page. Nice for browsing on a small screen or with a tiling window manager.
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @version     1
// @grant       none
// ==/UserScript==

exterminate("mw-panel");
nomargin("left-navigation");
nomargin("content");

function nomargin(targetId){
    if( document.getElementById(targetId) ){
        document.getElementById(targetId).style.marginLeft="0";
    }
}

function exterminate( targetId ){
	if( document.getElementById(targetId) ){
		document.getElementById(targetId).style.display = "none";
	}
}