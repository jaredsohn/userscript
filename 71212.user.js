// ==UserScript==
// @name          Attiva Farmville Filtro (Facebook)
// @description	  Filtra su facebook solo le pubblicazioni di farmville
// @author        corrado
// @include       http://www.facebook.com/home.php?filter=app_102452128776*
// ==/UserScript==
(function() {
var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"102452128776\"]) {\ndisplay:none !important;\n}";
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
