// ==UserScript==
// @name          iGoogle Compact
// @description	  Shrinks the header and footer and moves the top bar into the header
// @author        grantman416
// @include       http://www.google.com/*
// @include       http://google.com/*
// ==/UserScript==
(function() {
var css = "html, body {\nwidth: 100% !important;\n}\n#gbar, #guser {\nbackground: transparent !important;\nmargin-bottom: -24px !important;\ncolor: #FFF !important;\n}\n#footerwrap {\nheight: 145px !important;\n}\n#themeinfo {\ndisplay: none !important;\n}\n.msg {\nposition: relative !important;\nz-index: 9999 !important;\n}\n.gb1, .gb1 a, .gb3, .gb3 a, #gbar a, #guser a {\ncolor: #FFF !important;\n}\n.uftl {\npadding: 0px !important;\nmax-height: 17px !important;\noverflow: hidden !important;\n}\n.uftl a:visited {\ncolor: #222 !important;\n}\n.gbh {\nborder-top: none !important;\n}\n#nhdrwrapsizer {\nheight: 100px !important;\npadding-top: 20px !important;\n}\n#guser {\ndisplay: block;\nmargin-left: 323px !important;\n}\n#doc3 {\nwidth: 100% !important;\nmin-width: 740px !important;\n}";
if (document.title == "iGoogle") {
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
}
})();
