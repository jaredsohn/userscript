// ==UserScript==
// @name           passlot links
// @namespace      http://www.passlot.com/*
// @include        http://www.passlot.com/*
// ==/UserScript==

var tags = document.getElementsByTagName('strong');

for (var i = 0, url; i<tags.length; i++) {
	url = tags[i];
	if(url.innerHTML.match("http")){		

	url.innerHTML = "<a href="+url.innerHTML+">"+"<font color='red'>"+url.innerHTML.match(/:\/\/(.*:.*@)?(.[^/]+)/)[2]+"</font color>"+"</a>";

	}
				
}