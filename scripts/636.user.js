// Remove Moreover ads from Bloglines
//
// Copyright 2005 Damon Cortesi (WebDamon at dcortesi dot com)
//
// About:
//
// I got tired of reading my Chicago Moreover news feed
// with an ad every other post, so I figured out how
// to use greasemonkey and hacked this up.
//

// ==UserScript==
// @name          Bloglines Moreover Ad Remover
// @namespace     http://dcortesi.com/download/moreoverads.user.js
// @description   Get rid of ads in moreover feeds on bloglines
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// ==/UserScript==

(function() {

	var adCount = 0;
	var title = document.getElementsByTagName("h1");
	if( title[0].innerHTML.match('Moreover - ') ) {
		var d = document.getElementsByTagName("h3");
		for(var i = 0; i < d.length; i++) {
			if( d[i].innerHTML.match('- Sponsored Link') ) {
				d[i].parentNode.style["display"] = "none";
				adCount++;
			}
		}
	
		var li = document.getElementsByTagName("li");
		for(var i = 0; i < li.length; i++) {
			if( li[i].innerHTML.split(/ /)[1] == "Items" ) {
				var tmp = li[i].innerHTML;
				li[i].innerHTML = tmp + " (" + adCount + " ads)";
			}
		}
	}

})();
