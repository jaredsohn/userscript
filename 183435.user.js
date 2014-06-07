// ==UserScript==
// @name          Centering Facebook Game Simple
// @namespace     http://i-blogger-you.blogspot.com/
// @description	  Centering, hide right side of game on facebook make with top blue bar width fix and position fixed
// @version       1.0
// @author        Sukma Gemala
// @homepage      http://panduanmu.blogspot.com/
// @include       https://apps.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body.canvas.liquid #blueBar div#pageHead,body.canvas.liquid div#globalContainer\n{\nmin-width: 900px\n}\n#rightCol\n{\ndisplay:none !important\n}\n#pagelet_bluebar\n{\nposition:fixed;\ntop:0;\nz-index:999;\n}\n#globalContainer{\nmargin-top:40px;\n}";
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