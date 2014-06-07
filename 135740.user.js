// ==UserScript==
// @name          kaskus destroyer (just for fun)
// @namespace     http://usersscript.org
// @description	  This userstyle is for those of you who feel very mad with new kaskus so ifu wanna destroy it u can use it
// @author        rownaatkinsom
// @homepage      http://usersript.org
// @include       http://kaskus.co.id/*
// @include       http://livebeta.kaskus.co.id/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "form {\n-moz-transform: rotate(8deg) translateY(10px);\n-webkit-transform: rotate(8deg) translateY(10px);\n}\nbr + font {\n-moz-transform: rotate(-5deg) translateY(50px);\n-webkit-transform: rotate(-5deg) translateY(50px);\n}\na:link {\n-moz-transform: rotate(180deg);\n-webkit-transform: rotate(180deg);\n}\nimg {\n-moz-transform: rotate(-15deg) translate(150px,12px);\n-webkit-transform: rotate(-15deg) translate(150px,12px);\n}\np > font {\n-moz-transform: rotate(60deg) translate(40px,90px);\n-webkit-transform: rotate(60deg) translate(40px,90px);\n}\n.gac_m {\n-moz-transform: rotate(20deg) translateX(-200px);\n-webkit-transform: rotate(20deg) translateX(-200px);\n}";
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
