// ==UserScript==
// @name          Quanteck Popout
// @namespace     http://userstyles.org
// @description	  asd
// @author        DonRolf94
// @homepage      http://userstyles.org/styles/100002
// @run-at        http://www.twitch.tv/quanteck/chat?popout=
// ==/UserScript==
(function() {
var css = "";
css += "@font-face {\nfont-family: 'Continuum';\n     url('https://dl.dropboxusercontent.com/u/70616174/contm.ttf')  format('truetype'), \n}";
if (false || (location.href.replace(location.hash,'') == "http://www.twitch.tv/quanteck/chat?popout="))
	css += "body {\n        font-family: 'Continuum';\n        font-size: 14px;\n    }";
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
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
