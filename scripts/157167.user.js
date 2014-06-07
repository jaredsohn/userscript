// ==UserScript==
// @name          t.co Bypasser on load
// @description   Bypasses the t.co shortner on Twitter on load
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @grant         none
// ==/UserScript==

function fix_links () {
	var links=document.getElementsByTagName("a");
	for (var key in links){
		if (links.hasOwnProperty(key)) {
			var expanded = links[key].getAttribute("data-expanded-url");
			if(expanded !== null) {
				//console.log(links[key], "→", expanded);
				links[key].href = expanded;
			}
		}
	}
}


window.addEventListener("load", function() {
	fix_links();
});

window.addEventListener("scroll", function() {
	// ideally this would hook into Twitter's call, but this seems to work fine
	if(window.scrollY > window.scrollMaxY - 100) { // give it some margin, necessary?
		fix_links();
	}
});
