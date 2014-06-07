// ==UserScript==
// @name          Wikipedia NOT Banner
// @namespace     http://userstyles.org
// @description	  Remove banner on Wikipedia world.
// @author        HannibalSmith
// @homepage      http://userscripts.org/users/35001
// @include       http://mediawiki.org/*
// @include       https://mediawiki.org/*
// @include       http://*.mediawiki.org/*
// @include       https://*.mediawiki.org/*
// @include       http://wikibooks.org/*
// @include       https://wikibooks.org/*
// @include       http://*.wikibooks.org/*
// @include       https://*.wikibooks.org/*
// @include       http://wikimedia.org/*
// @include       https://wikimedia.org/*
// @include       http://*.wikimedia.org/*
// @include       https://*.wikimedia.org/*
// @include       http://wikimediafoundation.org/*
// @include       https://wikimediafoundation.org/*
// @include       http://*.wikimediafoundation.org/*
// @include       https://*.wikimediafoundation.org/*
// @include       http://wikinews.org/*
// @include       https://wikinews.org/*
// @include       http://*.wikinews.org/*
// @include       https://*.wikinews.org/*
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// @include       http://wikiquote.org/*
// @include       https://wikiquote.org/*
// @include       http://*.wikiquote.org/*
// @include       https://*.wikiquote.org/*
// @include       http://wikisource.org/*
// @include       https://wikisource.org/*
// @include       http://*.wikisource.org/*
// @include       https://*.wikisource.org/*
// @include       http://wikiversity.org/*
// @include       https://wikiversity.org/*
// @include       http://*.wikiversity.org/*
// @include       https://*.wikiversity.org/*
// @include       http://wiktionary.org/*
// @include       https://wiktionary.org/*
// @include       http://*.wiktionary.org/*
// @include       https://*.wiktionary.org/*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .siteNoticeBig { display: none !important; visibility: hidden !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
