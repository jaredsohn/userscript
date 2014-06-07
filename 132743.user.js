// ==UserScript==
// @name          WEBPAGE Scrollbars ONLY - Autohide(No Empty Space)
// @namespace     http://userstyles.org
// @description	  â–ºâ–ºâ–º <u>IMPORTANT</u> â—„â—„â—„
// @author        Barbiegirl
// @homepage      http://userstyles.org/styles/18874
// @include       http://*
// @include       https://*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body scrollbar[orient=\"vertical\"],\nbody scrollbar[orient=\"vertical\"]:hover,\nbody scrollbar[orient=\"horizontal\"],\nbody scrollbar[orient=\"horizontal\"]:hover\n{min-width: 17px !important;\nmax-width: 17px!important;}\n\n\n\n\nscrollbar[orient=\"vertical\"]\n{\nopacity: 0 !important;\nmin-width: 2px !important;\nmax-width: 2px !important;}\n\n\nscrollbar[orient=\"vertical\"]:hover\n{\nopacity: 1 !important;\nmin-width: 17px !important;\npadding-right: 1px !important;}\n\n\n\n\n\n\nscrollbar[orient=\"horizontal\"]\n{\nopacity: 0 !important;\nmin-height: 5px !important;\nmax-height: 5px !important;}\n\n\nscrollbar[orient=\"horizontal\"]:hover\n{\nopacity: 1 !important;\nmin-height: 17px !important;\nmax-height: 17px !important;\npadding-bottom: 1px !important;}\n\n\n\n\n\nscrollcorner{opacity: 0 !important;}\nscrollbar scrollcorner:hover {background:transparent !important;}\n\n\n\n\nselect scrollbar[orient=\"vertical\"],\nselect scrollbar[orient=\"vertical\"]:hover\n{\nopacity: 1 !important;\nmin-width: 17px !important;\nmax-width: 17px!important;}";
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