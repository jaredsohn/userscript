// ==UserScript==
// @name          Fotka Orange
// @namespace     http://userstyles.org
// @description	  Fotka Green// @author        Parlez
// @homepage      http://userstyles.org/styles/6349
// @include       http://www.fotka.pl/*
// @include       https://www.fotka.pl/*
// @include       http://*.www.fotka.pl/*
// @include       https://*.www.fotka.pl/*
// @include       http://www.fotka.pl/forum/*
// @include       http://www.fotka.pl/
// @include       http://www.fotka.pl/index.php
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "www.fotka.pl" || document.domain.substring(document.domain.indexOf(".www.fotka.pl") + 1) == "www.fotka.pl"))
	css += ".k10, h1, h2, a, a:hover, a.k01:hover, a.k21:hover, a.k10:visited{color:#437305 !important}\n#menu a {color:#437305 !important}\nth {border-bottom-color:#437305 !important;}\n#menu {background-image: url('http://w.fotka.pl/71b24c712c.jpg') !important; background-color: #437305 !important;}\ntd {background-image: none !important;}\n.bg10 {background-color: white !important; color:black !important;}\nth {border-bottom-color: #437305;}\n.slupek {background-color: #437305 !important;}\ndiv[style*=\"position: relative\"] {color: #437305 !important}body { background-image: url('http://w.fotka.pl/71b24c712c.jpg'); } \n\ntable {background-color:transparent !important}\nb {color:#437305;}\ntextarea[id*=\"BB_Infobox\"] {opacity:0.3 !important;}\n.bg23 {background-color:transparent !important}\n#menu_konto {background-image: none !important}\ntr {background-color:transparent !important}\n.b10 {background-image:none !important}\n.k01 {color:#437305 !important}";
if (false || (document.location.href.indexOf("http://www.fotka.pl/forum/") == 0))
	css += "td {background-image:none !important;  background-color : transparent !important;}";
if (false || (location.href.replace(location.hash,'') == "http://www.fotka.pl/") || (location.href.replace(location.hash,'') == "http://www.fotka.pl/index.php"))
	css += "td[style=\"padding: 2px; color: rgb(255, 255, 255);\"] > b{color: white !important;}";
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
