// ==UserScript==
// @name          Ajax Rain Auto-Click Article
// @namespace     http://www.ajaxrain.com/
// @description	  Automatically clicks Ajax Rain article links
// @include       http://www.ajaxrain.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {

var divs = document.getElementsByTagName("div");

for(var i=0;i<divs.length;i++){

	if(divs[i].className == "feature")
	{
		var children = divs[i].childNodes;
		for(var child=0;child<children.length;child++){
			if(children[child].nodeName=="A"){
			document.location=children[child].getAttribute("href");
			}	
		}
	}
}
})();

