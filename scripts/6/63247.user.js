// ==UserScript==
// @name           fix deviant
// @namespace      links
// @description    fix outgoing links for DA
// @include        http://*.deviantart.com/*
// ==/UserScript==

//http://www.deviantart.com/users/outgoing?http://vanity-zero.com/blog/

(function(){
	var links = document.getElementsByTagName('a');
	for(var i=0, l=links.length; i < l; i++) {
		var a = links[i];
		if(a.href.substring(0, 41) == 'http://www.deviantart.com/users/outgoing?') {
			a.href = a.href.substring(41);
		}
	}
})();
