// ==UserScript==
// @name          SuperHabraKarmaHider_Votable
// @namespace     http://userstyles.org
// @description	  Hides values of habrakarma and habraforce (with voting enabled). Authors: va1en0k, marapper
// @author        marapper (originally - va1en0k)
// @homepage      http://userstyles.org/styles/7516
// @include       http://habrahabr.ru/*
// @include       https://habrahabr.ru/*
// @include       http://*.habrahabr.ru/*
// @include       https://*.habrahabr.ru/*
// ==/UserScript==

/*
*	уничтожает понятие кармы полностью
*	код стырен с разрешения автора и переделан под новую верстку СуперХабра
*	оригинально-необычный автор (уже забаненный в ходе Священной Войны Леммингов) - Валя, http://va1en0k.net
*	переделано кривыми руками святого отца Мараппера, http://iskariot.ru
*/

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .karma-holder > .karma > dl > dd > .mark { display: none; } .karma-holder > .karma > dl > dd > em { display: none; } .habraforce > dl > dd > .number { display: none; }";
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

