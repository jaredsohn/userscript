// ==UserScript==
// @name           RSS Graffiti links open in a new tab
// @namespace      http://mike.thedt.net
// @description    RSS Graffiti posts in Facebook do not open in a new tab. This script makes all links posted by RSS Graffiti open in a new tab.
// @include        http://www.facebook.com/*
// @version        1.0
// ==/UserScript==

window.addEventListener("load", function() {
	var posts = document.getElementById('pagelet_intentional_stream');
	posts.addEventListener("DOMNodeInserted", function() {
		var rssGraffiti = document.getElementsByClassName('aid_45439413586');

		for (var i = 0; i<rssGraffiti.length; i++) {
			var post = rssGraffiti[i].getElementsByClassName('mvm uiStreamAttachments clearfix');
			var links = post[0].getElementsByTagName('a');
			for (var j=0; j<links.length; j++) {
				links[j].target = "_blank";
			}
		}
	}, false);
}, true);