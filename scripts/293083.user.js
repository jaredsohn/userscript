// ==UserScript==
// @name 			cs032 NiceSite
// @namespace		http://eliasmartinezcohen.com/
// @include     	http://cs.brown.edu/courses/cs032/*
// Source the new styles from github
// @resource nice https://raw.github.com/eliath/cs032_NiceSite/master/nice.css
//
// 
// ==/UserScript==

/* Delete spongebob shit */
console.log("removing banner...");
var _banner = document.getElementById("banner-container");
_banner.parentNode.removeChild(_banner); //delete pic banner
console.log("done rm banner");

console.log('start: add CSS');
var nice_styles  = GM_getResourceText("nice");
if (nice_styles == "undefined") {
	console.log("fuck its undef.");
};
GM_addStyle(nice_styles);
console.log('done: add CSS');