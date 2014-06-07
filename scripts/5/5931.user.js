// ==UserScript==
// @name          TitanTv Ad Removal
// @namespace     http://www.creativeschmidts.com
// @description	  Gets rid of all ads on TitanTv
// @include       http://*.titantv.com/*
// ==/UserScript==

var paragraphs = document.getElementsByTagName("div");

for (var i = 0; i < paragraphs.length; i++) {
	if (paragraphs[i].className == "headerBackground") {
		//paragraphs[i].style.display = "none";
		paragraphs[i].parentNode.removeChild(paragraphs[i]);
		break;
	}
}

document.getElementById("adbar").parentNode.removeChild(document.getElementById("adbar"));
document.getElementById("leaderboard").parentNode.removeChild(document.getElementById("leaderboard"));