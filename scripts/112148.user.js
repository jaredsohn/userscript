// ==UserScript==
// @name          SC2M CSS Simple
// @description   SC2 Manager Custom CSS
// @version	  1.0.0
// @namespace     HellsAn631
// @include       http://sc2manager.org/*
// @include       http://www.sc2manager.org/*
// @exclude       http://sc2manager.org/f/*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

// If you have your own css sheet that you want to use, change this URI.

addStyle('@import "http://star2rnd.com/sc2m/simple.css";');