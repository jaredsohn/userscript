// ==UserScript==
// @name          Bigger Player for Tubalr.com
// @description	  Makes the video player 640x390(youtube standart) in tubalr.com.
// @author        kadikoy
// @include       http://www.tubalr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#player,#ytplayerid iframe{width:640px !important; height:390px !important;}\n\n#ytplayerid {width:620px !important; height:390px !important;}\n\n#icons {margin-left:645px !important;}\n\n#main {width:640px !important;}";
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
