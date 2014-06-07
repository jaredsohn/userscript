// ==UserScript==
// @name          Set Arial&Tahoma as default fonts
// @namespace     http://ahydra.org/snaked/
// @description	  设置Arial,Tahoma为缺省字体
// @author        snaked
// @homepage      
// ==/UserScript==
(function() {
var css = "*{font-family:Arial, Tahoma}";
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
