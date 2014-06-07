// ==UserScript==
// @name          24ur.com odstranjeni Facebook lajki s komentarjev
// @description	  Vse ki motijo Facebook lajki poleg komentarjev na 24ur.com in se stran nalaga celo večnost, sem izdelal majhen dodatek za brskalnik, ki odstrani lajke s komentarjev in s tem močno pohitri nalaganje strani.
// @author        Joker1337
// @include       http://24ur.com/*
// @include       https://24ur.com/*
// @include       http://*.24ur.com/*
// @include       https://*.24ur.com/*
// ==/UserScript==
(function() {
var css = ".fbLike { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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
