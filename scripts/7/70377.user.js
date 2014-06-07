// ==UserScript==
// @name           kill msplinks
// @namespace      links
// @description    fixes annoying msplinks hijacks; shorter, more efficient implementation than the old msplinks script
// @include        http://*myspace.com/*
// ==/UserScript==

(function(){
	var links = document.getElementsByTagName('a');
	for(var i=links.length; i--;) {
		var a = links[i];
		if(a.href.substring(0, 24) == 'http://www.msplinks.com/') {
			a.href = atob(a.href.substring(24)).substring(2);
		}
	}
})();
