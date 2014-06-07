// ==UserScript==
// @name           Twitter DM Plus
// @namespace      _caizzz
// @description    blabla
// @version        1.0
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// // ==/UserScript==



(function() {
var css = "i.new {width:10px;height: 10px; background-color:#fff;}}";
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