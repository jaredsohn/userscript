// ==UserScript== 
// @name	KaraSozluk
// @namespace	KaraSozluk
// @description	Sözlük sitelerinin siyah arkaplan olmasını sağlar.
// @include	http://www.eksisozluk.com/* 
// @include	http://www.sourtimes.org/* 
// @include	http://sozluk.sourtimes.org/* 
// @include	http://beta.eksisozluk.com/*
// @include	http://www.itusozluk.com/*
// @include	http://www.uludagsozluk.com/*
// ==/UserScript== 
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); * {background-color:#000!important;color:#fff!important} a,a:visited{color:#fff!important;font-weight:bold;} a:hover{color:#555!important;background:transparent!important}";
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
