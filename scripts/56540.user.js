// ==UserScript==
// @name           Disbelief: Affirmative action for non-religious Redditors
// @namespace      www.belidge.com
// @description    Are you tired of having to see the christianity subreddit on the home page of reddit and not the atheism subreddit? Well this is a script for you.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

/*

  Author: sotopheavy
  Date:   2009-08-27

*/
var header = document.getElementById("sr-header-area");

if(header != null) {
	var bars = header.childNodes;
	
	var swapfrom = ["christianity", "atheism"];
	var swapto = ["ಠ_ಠ <span style=\"font-size:1.5em;\">→</span> Christianity", "<i style=\"font-size:1.4em;color:#F00;font-weight:100;\">A</i>theism"];
	var hrefchange = ["http://www.reddit.com/r/atheism", ""];
	
	
	for( var x = 0; bars.length; x++ ) {
		if(bars[x].nodeName == "UL") {
			var list = bars[x].childNodes;
			for( var y = 0; y < list.length; y++ ) {
				if(list[y].nodeName == "LI") {
					var links = list[y].childNodes;
					for( var z = 0; z < links.length; z++ ) {
						if(links[z].nodeName == "A") {
							var subreddit = links[z].innerHTML;
							var n = swapfrom.indexOf(subreddit.toLowerCase());

							if(n != -1) {
								if(swapto[n] && swapto[n] != "") {
									links[z].innerHTML = swapto[n];
									if(hrefchange[n] && hrefchange[n] != "") {
										links[z].href = hrefchange[n];
									}
								} else {
									list[y].style.display = "none";
								}
							}
						}
					}
				}
			}
		}
	}
}

