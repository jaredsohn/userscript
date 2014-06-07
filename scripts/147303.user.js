// ==UserScript==
// @name          Ultimate Whovian [Module IV] â€” Doctor Who Icons
// @namespace     http://userstyles.org
// @description	  This is part of my <a href="http://userstyles.org/styles/74483/">Ultimate Whovian tumblr style</a>, uploaded separately so you can mix and match anyway you like it! =)
// @author        Galifreyan Doctor Who Tumblr Icons
// @homepage      http://userstyles.org/styles/74491
// @include       http://www.tumblr.com/*
// @include       https://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#popover_blogs .tab_notice:after{display:none; }\n\n#header .iconic>a{\n		background-image:url('http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o6_250.png') !important;}";
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