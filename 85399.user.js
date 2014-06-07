// ==UserScript==
// @name          Gameprizes - Removes Survey On MSPoints Page
// @namespace     http://userstyles.org
// @description	  This Style Removes The Survey On The Microsoft Points Page On Gameprizes.net
// @author        gofish
// @homepage      http://userstyles.org/styles/36491
// @include       http://gamesprizes.net/MicrosoftPoints*
// @include       /https://gamesprizes.net/MicrosoftPoints*
// ==/UserScript==
(function() {
var css = "div[id=\"gw_main\"], div[id=\"gw_overlay\"] {\ndisplay: none !important;\n}";
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
