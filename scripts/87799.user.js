// ==UserScript==
// @name           xing
// @namespace      xingblockrefsearch
// @description    block referrer on search
// @include        https://www.xing.com/app/search*
// ==/UserScript==

function removerefs() {
	var getlinks = document.getElementsByTagName("a");

	for ( var i = 0; i < getlinks.length; ++i ) {
	  var linkName = getlinks[i].href;
		var s = linkName.search(/\/profile\/.+\/N\d+\..+$/);
		if( s != -1) {
				editedLink = linkName.replace(/\/N\d+\..+$/, "");
				getlinks[i].href = editedLink;
		}
	}
}

setInterval(removerefs,200);