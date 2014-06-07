// ==UserScript==
// @name           Xing Referer Remover
// @namespace      
// @description    Removes the click tracking part from Xing profile URLs
// @include        *.xing.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for ( var i = 0; i < links.length; ++i ) {
  var linkName = links[i].href;
	var s = linkName.search(/\/profile\/.+\/N\d+\..+$/);
	if( s != -1) {
			editedLink = linkName.replace(/\/N\d+\..+$/, "");
			links[i].href = editedLink;
	}
}
