// ==UserScript==
// @name           OGame Redesign: AntiGame come over Fix
// @description	   Fix AntiGame event list, now it`s no come over planet list
// @author         Joks u65
// @version	   1.1
// @include        http://*.ogame.*/game/index.php?page=overview*

// ==/UserScript==

(function() {
if (document.location.href.indexOf ("/game/index.php?page=overview") == -1)

return;


var css = "div#newEventBox {width: 700px !important;margin-left: -5px !important;}div#rechts {margin-left: 25px !important;width: 132px !important;}li.detailsFleet {width: 95px !important;}div.clue-right-event {margin-left: -10px !important;}";

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