// ==UserScript==
// @name          Ekşi Sözlük Sütbeyazı
// @namespace     http://userstyles.org
// @description	  Sütbeyazı ekşisözlük teması...
// @author        apranaxfort
// @homepage      http://userstyles.org/styles/9254
// @include       http://sozluk.sourtimes.org/*
// @include       https://sozluk.sourtimes.org/*
// @include       http://*.sozluk.sourtimes.org/*
// @include       https://*.sozluk.sourtimes.org/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); * {background:#FFFFFF!important; color:#222222!important;font-size:11px;} a {color:#5555AA!important;font-weight:bold;} a:hover {color:#555555 !important;} a:visited {color:#7777AA!important;}";
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
