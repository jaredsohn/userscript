// ==UserScript==
// @name        WK Review Forcer
// @namespace   penx.scripts
// @description Redirects you to the review page if you have reviews pending and try to go to the forums.
// @include     http://www.wanikani.com/*
// @version     1.0
// @updateURL   http://userscripts.org/scripts/source/167448.meta.js
// ==/UserScript==

function main(){

	if(window.location.href.indexOf("community") != -1 || window.location.href.indexOf("chat") != -1){
		
		if(document.getElementsByClassName("reviews")[0].getElementsByTagName("span")[0].innerHTML != 0){
		
			window.location = "http://www.wanikani.com/review";
			
		}
	}
}

document.addEventListener("DOMContentLoaded", main, false);