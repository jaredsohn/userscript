// ==UserScript==
// @name          HV Mini
// @namespace     http://userstyles.org
// @description	  It's so cute!
// @author        goldensun
// @homepage      http://userstyles.org/styles/34989
// @include       http://hentaiverse.org/*
// @include       https://hentaiverse.org/*
// @include       http://*.hentaiverse.org/*
// @include       https://*.hentaiverse.org/*
// ==/UserScript==
(function() {
var css = "table{display: none !important; }\nimg[class=cw]{display: none !important; }\ndiv[class=cbl]{display: none !important; }\ndiv[class=cnb]{display: none !important; }\ndiv[class=btt]{display: none !important; }\ndiv[class=btpa]{display: none !important; }\ndiv[id=infopane]{display: none !important; }\ndiv[id=togpane_log]{display: none !important; }\ndiv.csp{height: 850px !important; width: 400px !important; }\ndiv.clb{float: none !important; height: 75px !important; }\ndiv.cmp{float: none !important; }\ndiv.btp{border: none !important; height: 50px !important; margin: 0px !important; }\ndiv.btl{float: none !important; height: 90px !important; }\ndiv.btmp{float: none !important; margin-left: 0px !important; overflow: none !important; }\ndiv[style^=border]{border: none !important; }";
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
