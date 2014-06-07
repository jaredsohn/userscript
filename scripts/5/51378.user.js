// ==UserScript==
// @name          Orkut Beach View
// @namespace     http://userstyles.org
// @description	  Mudança simplista no fundo
// @author        .Ret
// @homepage      http://userstyles.org/styles/10005
// @include       http://www.orkut.*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body { background-image: url(\"http://republicfoil.com/picts/expanded_metal.jpg\") !important; background-attachment: fixed !important; } #header, #header li.logobg { background-color: #000000 !important} .useremail { color: #696969 !important; }";
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
