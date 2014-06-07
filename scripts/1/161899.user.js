// ==UserScript==
// @name        Twitter: No promoted tweets
// @namespace   com.gingerbeardman.userscript.nopromotedtweets
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1
// ==/UserScript==

function killit() {
	var kills = document.getElementsByClassName("badge-promoted");

	for(var i = 0; i < kills.length; i++) { 
		kills[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
	}
}

setTimeout(killit, 100);
