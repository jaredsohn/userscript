// ==UserScript==
// @name           Display link on mouseover
// @namespace      http://userscript.org/
// @description    Displays the link location on mouseover.
// @include        *
// ==/UserScript==

(function () {
	dl=document.links;
	for(i=0;i<dl.length;++i){
		dl[i].title="Link Address: " + dl[i].href;
	}
})();