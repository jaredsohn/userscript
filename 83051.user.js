// ==UserScript==
// @name           reddit: gives each subreddit link a color
// @namespace      http://reddit.com/*
// @namespace      http://*.reddit.com/*
// @description    each subreddit link get a randomly chosen, but consistent color
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*

var cols = "0123456789abcdef";
var links = document.getElementsByTagName( 'a' );

for ( var i = 0; i < links.length; i++ ) {
    var element = links[ i ];
		if (element.className=="subreddit hover") {
			var col = "#";
			var text = element.innerHTML;
			for (var j = 0; j < 6;j=j+1) {
				var num = (text.length + text.charCodeAt(j%(text.length)))%16
				col = col + cols[num];
			}
			element.style.color = col;
		}
}

// ==/UserScript==//
