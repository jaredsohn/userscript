// ==UserScript==
// @name           ProstoPleer
// @namespace      http://prostopleer.com
// @description    Removes prostopleer.com ads
// @author         vovchak
// @homepage       http://vovchak.com
// ==/UserScript==

(function() {
	var css = "";
	css += ".ad { display:none !important;}";
	css += "#sidebar {right: 30px !important; position: relative !important; top: -100px !important; z-index: 90; margin-top: 0px;left:10px !important;}"
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}	
})();