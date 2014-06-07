// ==UserScript==
// @name          orange + grau
// @namespace     http://userstyles.org
// @description	  rahmen und sonstiges in orang
// @author        Lennart Hölscher
// @homepage      http://userstyles.org/styles/2974
// @include       http://www.schuelervz.net/*
// @include       https://www.schuelervz.net/*
// @include       http://*.www.schuelervz.net/*
// @include       https://*.www.schuelervz.net/*
// @include       http://www.schuelervz.net/
// ==/UserScript==
(function() {
var css = "@import url(http://static.pe.meinvz.net/20090925-1/Css/Default.css); \n @import url(http://static.pe.meinvz.net/20090925-1/Css/Main.css); \n @import url(http://static.pe.meinvz.net/20090925-1/Css/Objects.css); \n @import url(http://static.pe.meinvz.net/20090925-1/Css/DefaultJS.css);\n @import url(http://static.pe.meinvz.net/20090925-1/Css/Login.css);      \n @import url(http://static.pe.meinvz.net/20090925-1/Css/LeftSideBox.css);  \n @import url(http://static.pe.meinvz.net/20090925-1/Css/Mod_Default.css); \n";
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
