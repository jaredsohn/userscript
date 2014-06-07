// ==UserScript==
// @name          fb chatbox fix
// @description	  fixes fb chatbox height on 300px
// @author        mononym edit by SlickOne
// @homepage      http://userscripts.org/users/186795
// @include       *.facebook.com/*
// ==/UserScript==
(function() {
var css = ".fbNubFlyout.uiToggleFlyout { overflow: auto; height: 300px; }";
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