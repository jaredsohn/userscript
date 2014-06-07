// ==UserScript==
// @name          BBC iPlayer > Big Videos
// @author        SouthSomewhere
// @description	  Expands video to fit nicely within the div. Does not make it full screen!!
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=93587&days=1&show
// @include       http://www.bbc.co.uk/iplayer/episode/*
// @include       http://www.bbc.co.uk/iplayer/playlive*
// ==/UserScript==
(function() {
var css = "#emp {width: 100% !important; height: 585px !important;}\n#bbc_emp_embed_emp {width: 100% !important; height: 585px !important;}";
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