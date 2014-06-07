// ==UserScript==
// @name          PP Avatar Mover
// @namespace     http://plasticparadise.forumotion.com/
// @description	  Moves the viewtopics profiles on PP to the left 
// @author       original author is Balint. edited for PP by AmandaRuth
// @homepage     http://plasticparadise.forumotion.com/
// @include      http://plasticparadise.forumotion.com/*
// ==/UserScript==
(function() {
var css = ".postbody {float: right !important; border-left: 1px solid #fff!important; padding-left: 10px !important }\n.postprofile {float: left !important; border-left: none !important ; width: 180px !important; margin-right: 0px !important; }\n.online {background-position: 140px 0 !important; }";
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