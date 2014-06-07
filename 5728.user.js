// ==UserScript==
// @name          I'm Feeling del.icio.us
// @namespace     http://docmittens.org/
// @description	  Emulate Google's I'm Feeling Lucky for del.icio.us bookmarks
// @include       http://del.icio.us/*/?/
// @author        Ashur Albertson, spam@docmittens.org
// ==/UserScript==

(function() {
        var lists = document.getElementsByTagName('ol');
	var i=0;
	while(lists[0].childNodes[1].childNodes[1].childNodes[i].tagName != "A"){
		i++;
	}
	var url   = lists[0].childNodes[1].childNodes[1].childNodes[i].href;
	document.location.href=url;
})();