// ==UserScript==
// @name          4chan dark minimal
// @namespace     http://userstyles.org
// @description	  based heavily off of HURR
// @author        david9001
// @homepage      http://userstyles.org/styles/13719
// @include       http://4chan.org/*
// @include       https://4chan.org/*
// @include       http://*.4chan.org/*
// @include       https://*.4chan.org/*
// ==/UserScript==
(function() {
var css = "body { background: ##0091FF !important; color: #eee !important; }\n	* { font: 10pt \"Sans\"; }\n	a { color: #efefef !important; }\n	hr { display: none !important; }\n	#navtop, #navbot { background: #000; color: #000 !important; width: 100%; text-align: center; height: 12pt; font-size: 7pt !important; }\n	#navtop *, #navbot * { color: #eee; font-size: 7pt; display: inline; }\n	#navtop a:hover, #navbot a:hover { background: #555; }\n	form { margin: 1em; }\n	.inputtext, textarea { width: 295px; }\n	.rules { display: none; }\n	td.postblock { background: #444 !important; border: 1px solid #666 !important; color: #aaa !important; }\n	td.postblock * { font-size: 6pt; }\n 	td.reply, td.replyhl { background-color:#333 !important; border: 1px solid #555 !important; color: #eee !important;-moz-border-radius: 8px; }\n	td.replyhl { background-color:#0091FF !important; border: 1px solid #003963 !important;	color: #eee !important; }\n	.postername, .filesize, span.filetitle, .filesize a, a.linkmail, a.quotejs, .replytitle, .commentpostername, .omittedposts, .abbr { color: #fff !important; font-size: 8pt;}\n	span.filetitle, .replytitle { color: #e15014 !important; }\n	#hd, small, font[size=\"1\"], font[size=\"2\"], #ft, #filter-button, #option-button, #navtopr, #navbotr, .logo,.logo font b span, .doubledash, img.rotating, input[type=\"button\"], td[align=\"right\"] { display: none !important; }\n	.pages { background: #444 !important; border: 1px solid #555 !important; }\n	.pages td { color: #444 !important; font-size: 4pt; }\n	.pages td a, .pages td b { color: #eee !important; font-size: 8pt; }\n	.pages td b { background-color: #000; }\n	.pages input { display: none !important; }\n	.pages td:first-child { display: none;}\n	pre, textarea, input:not([type=\"button\"]):not([type=\"checkbox\"]):not([type=\"submit\"]):not([type=\"reset\"]), select { font-size: 9pt ! important; color: #fff !important; background: #333 !important; border-color: gray !important; }\n	input[type=\"submit\"] { background: #444 !important; color: #aaa !important; border: 1px solid gray; -moz-appearance: none; font-size: 9pt; }\n	th { background: #222 !important; }\n	th font { font-size: 7pt; }\n	input[type=\"file\"] { opacity: 0.12 !important; }\n	td.deletebuttons { font-size: 8pt !important; color:#eee !important; }";
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
