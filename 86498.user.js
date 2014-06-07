// ==UserScript==
// @name          OGame Redesign: Fix Galaxy Layout
// @namespace     http://userstyles.org
// @description	  coloca las lunas en su casillero ,ya q estaban desplazadas.
// @author        QuadDamage
// @homepage      http://userstyles.org/styles/24179
// @include       http://ogame.org/*
// @include       https://ogame.org/*
// @include       http://*.ogame.org/*
// @include       https://*.ogame.org/*
// @include       http://ogame.com.br/*
// @include       https://ogame.com.br/*
// @include       http://*.ogame.com.br/*
// @include       https://*.ogame.com.br/*
// @include       http://ogame.cz/*
// @include       https://ogame.cz/*
// @include       http://*.ogame.cz/*
// @include       https://*.ogame.cz/*
// @include       http://ogame.de/*
// @include       https://ogame.de/*
// @include       http://*.ogame.de/*
// @include       https://*.ogame.de/*
// @include       http://ogame.dk/*
// @include       https://ogame.dk/*
// @include       http://*.ogame.dk/*
// @include       https://*.ogame.dk/*
// @include       http://ogame.com.es/*
// @include       https://ogame.com.es/*
// @include       http://*.ogame.com.es/*
// @include       https://*.ogame.com.es/*
// @include       http://ogame.fr/*
// @include       https://ogame.fr/*
// @include       http://*.ogame.fr/*
// @include       https://*.ogame.fr/*
// @include       http://ogame.gr/*
// @include       https://ogame.gr/*
// @include       http://*.ogame.gr/*
// @include       https://*.ogame.gr/*
// @include       http://ogame.com.hr/*
// @include       https://ogame.com.hr/*
// @include       http://*.ogame.com.hr/*
// @include       https://*.ogame.com.hr/*
// @include       http://ogame.hu/*
// @include       https://ogame.hu/*
// @include       http://*.ogame.hu/*
// @include       https://*.ogame.hu/*
// @include       http://ogame.it/*
// @include       https://ogame.it/*
// @include       http://*.ogame.it/*
// @include       https://*.ogame.it/*
// @include       http://ogame.jp/*
// @include       https://ogame.jp/*
// @include       http://*.ogame.jp/*
// @include       https://*.ogame.jp/*
// @include       http://ogame.lt/*
// @include       https://ogame.lt/*
// @include       http://*.ogame.lt/*
// @include       https://*.ogame.lt/*
// @include       http://ogame.lv/*
// @include       https://ogame.lv/*
// @include       http://*.ogame.lv/*
// @include       https://*.ogame.lv/*
// @include       http://ogame.nl/*
// @include       https://ogame.nl/*
// @include       http://*.ogame.nl/*
// @include       https://*.ogame.nl/*
// @include       http://ogame.no/*
// @include       https://ogame.no/*
// @include       http://*.ogame.no/*
// @include       https://*.ogame.no/*
// @include       http://ogame.pl/*
// @include       https://ogame.pl/*
// @include       http://*.ogame.pl/*
// @include       https://*.ogame.pl/*
// @include       http://ogame.com.pt/*
// @include       https://ogame.com.pt/*
// @include       http://*.ogame.com.pt/*
// @include       https://*.ogame.com.pt/*
// @include       http://ogame.ro/*
// @include       https://ogame.ro/*
// @include       http://*.ogame.ro/*
// @include       https://*.ogame.ro/*
// @include       http://ogame.rs/*
// @include       https://ogame.rs/*
// @include       http://*.ogame.rs/*
// @include       https://*.ogame.rs/*
// @include       http://ogame.ru/*
// @include       https://ogame.ru/*
// @include       http://*.ogame.ru/*
// @include       https://*.ogame.ru/*
// @include       http://ogame.se/*
// @include       https://ogame.se/*
// @include       http://*.ogame.se/*
// @include       https://*.ogame.se/*
// @include       http://ogame.si/*
// @include       https://ogame.si/*
// @include       http://*.ogame.si/*
// @include       https://*.ogame.si/*
// @include       http://ogame.sk/*
// @include       https://ogame.sk/*
// @include       http://*.ogame.sk/*
// @include       https://*.ogame.sk/*
// @include       http://ogame.com.tr/*
// @include       https://ogame.com.tr/*
// @include       http://*.ogame.com.tr/*
// @include       https://*.ogame.com.tr/*
// @include       http://ogame.tw/*
// @include       https://ogame.tw/*
// @include       http://*.ogame.tw/*
// @include       https://*.ogame.tw/*
// @include       http://ogame.us/*
// @include       https://ogame.us/*
// @include       http://*.ogame.us/*
// @include       https://*.ogame.us/*
// ==/UserScript==
(function() {
var css = "tr#galaxyheadbg2 > th[colspan=\"3\"] + th + th {\n	width: 34px !important;\n}\n\ntable#galaxytable > tbody > tr.row > td.spacer02 {\n	width: 0 !important;\n}\n\ntr#galaxyheadbg2 > th[colspan=\"3\"] + th + th + th {\n	width: 62px !important;\n	display: block;\n}\n\ntr#galaxyheadbg2 > th[colspan=\"3\"] + th + th + th + th {\n	width: 137px !important;\n}\n\ntable#galaxytable > tbody > tr.row > td.playername {\n	width: 137px !important;\n}";
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