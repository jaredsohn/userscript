// ==UserScript==
// @name           BT Mon No Ads | frankito777
// @namespace      http://*btmon.*
// @include        http://www.btmon.com/
// @version        1.0
// @copyright      Copyright (c) 2010, frankito777
// @authors        frankito777
// ==/UserScript==

(function() {
var css = "#middle_page {margin:0;width:100%;}";

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

document.getElementById("defads_if_top").src = "";
document.getElementById("defads_if_top").style.height = "1px";
document.getElementById("left_page").innerHTML = "";
document.getElementById("right_page").innerHTML = "";

})();