// ==UserScript==
// @name          Custom CSS For Eveboard.com
// @description   Custom css file for the skill showroom eveboard.com.
// @version	  1.0.0
// @namespace     NiNjAHoLiC
// @include       http://eveboard.com/*
// @include       http://www.eveboard.com/*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

// If you have your own css sheet that you want to use, change this URI.

addStyle('@import "http://dl.ninjaholic.com/custom_eve_board.css";');