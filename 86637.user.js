// ==UserScript==
// @name          marcar flotas on
// @namespace     http://userstyles.org
// @description	  marca el borde de las naves que hay en el menu de flotas en rojo
// @author        inox-bass
// @homepage      http://userstyles.org/styles/37212
// @include       http://ogame.ru/*
// @include       https://ogame.ru/*
// @include       http://*.ogame.ru/*
// @include       https://*.ogame.ru/*
// @include       http://ogame.org/*
// @include       https://ogame.org/*
// @include       http://*.ogame.org/*
// @include       https://*.ogame.org/*
// @include       http://ogame.de/*
// @include       https://ogame.de/*
// @include       http://*.ogame.de/*
// @include       https://*.ogame.de/*
// @include       http://ogame.dk/*
// @include       https://ogame.dk/*
// @include       http://*.ogame.dk/*
// @include       https://*.ogame.dk/*
// @include       http://ogame.com.pt/*
// @include       https://ogame.com.pt/*
// @include       http://*.ogame.com.pt/*
// @include       https://*.ogame.com.pt/*
// @include       http://ogame.us/*
// @include       https://ogame.us/*
// @include       http://*.ogame.us/*
// @include       https://*.ogame.us/*
// @include       http://ogame.com.es/*
// @include       https://ogame.com.es/*
// @include       http://*.ogame.com.es/*
// @include       https://*.ogame.com.es/*
// ==/UserScript==
(function() {
var css = "body#fleet1 .on a\n    {\n        border: thin solid red !important;\n    }";
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
