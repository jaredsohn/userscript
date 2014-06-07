// ==UserScript==
// @name           ITV Player > Big Videos
// @author         South Somewhere
// @description	   Expands video to fit nicely within the div. Does not make it full screen!!
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=98660&days=1&show
// @include        http://www.itv.com/itvplayer/video/?Filter=*
// ==/UserScript==

(function() {
var css = "#lightsoutWindow {position:absolute; left: -122px; top: 0px; width: 944px !important; height: 590px !important;}\n #Mercury_VideoPlayervideoplayer {position:absolute; top: 0px; width: 944px !important; height: 590px !important;}\n #placeholder36 {position:absolute; top: 751px !important;}\n #placeholder3 {position:absolute; top: 990px !important;}\n #g_footer_o {display: none;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (head.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();