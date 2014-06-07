// ==UserScript==
// @name           DrumBeatUrls
// @namespace      http://userscripts.org/users/58335
// @description    Shows URLs for items in DrumBeats on theoildrum.com
// @include        http://*.theoildrum.com/*
// @include        http://theoildrum.com/*
// ==/UserScript==


/**
	drumbeaturls version 1.03 (2008-07-09)

	First released 2008-07-04
	
	v1.01: Show url for all links in the main posts (not just those in a <p>).
	v1.02: Never show urls leading to theoildrum.com or #.
	v1.03: Don't use jQuery. Parse all links in #main (show urls in comments too). Don't show urls if they are already shown in the link text.

*/

if(self.location == top.location) {

	var links = document.getElementById('main').getElementsByTagName('a');
		
	for (var i = links.length - 1; i >=0; i--) {

		if(links[i] && links[i].firstChild && links[i].firstChild.data) {
			
			var href = links[i].getAttribute('href');
			
			if(href) {
		
				var showurl = href.replace(/https?:\/\/(www\.)?/, '');
				showurl = showurl.replace(/\/.*/, '');
				href = href.replace(/(\.[a-z]{1,10}\/).*/, "$1");
				
				var location = window.location.host;
				location = location.replace(/www\./);
				
				var showurl_regex = new RegExp(showurl);
				
				if(showurl && !location.match(showurl_regex) && !links[i].firstChild.data.match(showurl_regex) && showurl != '#') {
					
					var a = document.createElement('a');
					a.setAttribute('href', href);
					a.setAttribute('style', "font-style: normal; font-weight: normal; font-family: arial, helvetica, sans-serif; font-size: 12px; color: #444444;");
					a.textContent = ' [' + showurl + '] ';
					
					if(links[i].parentNode) {
					
						if(links[i].nextSibling) {
							links[i].parentNode.insertBefore(a, links[i].nextSibling);
						}
						else {
							links[i].parentNode.appendChild(a);
						}
						
					}
					
				}
				
			}
			
		}

	}

}
