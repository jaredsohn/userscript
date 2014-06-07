// ==UserScript==
// @name          @ vk oldfag style
// @namespace     http://userstyles.org
// @description	  вся информация на месте
// @author        kosteltsev
// @homepage      
// ==/UserScript==


(function() {
var css = "#full_info { \n display: block !important;} \n #short_info, #switch_personal_info { \n display: none !important; \n} "
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

