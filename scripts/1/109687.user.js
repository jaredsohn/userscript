// ==UserScript==
// @name           chess.com - live - bigger timer
// @namespace      http://userscripts.org
// @description    This script will increase the size of the timers in the live chess interface of chess.com. Works best with full board.
// @include        http://live.chess.com/*
// ==/UserScript==
(function() {
var css = ".timerin {\n  background-color: #FFFFFF !important;\n  border: medium none !important;\n  float: right  !important;\n  font-family: Arial,Helvetica,sans-serif !important;\n  font-size: 2em !important;\n  font-weight:  bold !important;\n  margin-top: -2px !important;\n  padding: 0px 0px 0px 4px !important;\n  position: relative ! important;\n  text-align: right!important;\n  width: 3em !important;\n  height: 0.8em;\n}";
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
