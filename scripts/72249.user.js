// ==UserScript==
// @name          Singletrackworld Forum Link Opener
// @namespace     http://www.me4pm.co.uk/scripts
// @description	  Opens links in threads in a new window
// @include       http://www.singletrackworld.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


var thread = unsafeWindow.document.getElementById('thread');
var links = unsafeWindow.document.getElementsByTagName('a');
for(i=0;i<links.length;i++){
	var link = links[i];
	if(link.href!=''||link.href!=undefined){
		if(link.href.indexOf(unsafeWindow.location.host) == -1){
			link.target = "_blank";
		}
	}	
};	


