// ==UserScript==
// @name	changementapercu
// @include http://*ogame*/game/index.php?page=*
// ==/UserScript==

(function() {
var css = ".eventFleet{color:#A8AAA7; font-style:italic;} .eventFleet td{font-size:10px;}";
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