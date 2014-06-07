// ==UserScript==
// @name          WykopLogolos
// @description   Podmienia logo na ładniejsze + Poradnik jak wstawić własne logo 
// @namespace     http://www.wykop.pl/ludzie/SebusPL/
// @include       http://wykop.pl/*
// @include       https://wykop.pl/*
// @include       http://*.wykop.pl/*
// @include       https://*.wykop.pl/*
// @run-at        document-start
// @version       0.7
// @author        SebusPL
// ==/UserScript==
(function() {                                                  // Tutaj wstaw link do loga pamiętaj że wymagane rozmiary to 104x27. Na końcu linku musi być \ 
var css = ".icon.websitefff, .icon.website {\n background: url(\"http://i.imgur.com/8SJSFZa.png\")!important;\n width: 104px!important;\n background-position:none!important;\n }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		document.documentElement.appendChild(node);
	}
}
})();