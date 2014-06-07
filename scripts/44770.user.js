// ==UserScript==
// @name          Gmail – Mail Highlighter
// @namespace     http://userscripts.org/users/84327
// @description	  Highlights new and read mail different colors and changes color when you hover over them
// @version       1.0
// @author        dudebudbro
// @homepage      http://userscripts.org/scripts/show/44770
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*

// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* REDESIGN MESSAGE LIST - SELECTED */ table.cf tr.zE:hover, table.tlc tr.ur:hover { background-color: #FFFF99 !important;} /* HOVERING SELECTED MESSAGE */ table.cf tr.x7:hover, table.tlc tr.ur:hover { background-color: #FFEA86 !important;}/* REDESIGN MESSAGE LIST - HOVER ITEM */ table.cf tr.yO:hover, table.tlc tr.rr:hover { background-color: #c3d9ff !important;}  /* SELECTED ITEM */ .x7 {background-color : #D1FFD0 !important; color : #000000 !important;} /* HOVER SELECTED ITEM */ .x7:hover {background-color: rgb(172,203,220) !important;} /* REDESIGN MESSAGE LIST - HOVER ITEM NEW */ table.cf tr.zE:hover, table.tlc tr.ur:hover { background-color: #FFEA86 !important;} /* NEW MESSAGE */ table.cf tr.zE, table.tlc tr.ur { background-color: #FFFF99 !important;}";
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