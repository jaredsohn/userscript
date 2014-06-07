// ==UserScript==
// @name          4chan dark - easy on the eye (edited)
// @namespace     http://userstyles.org
// @description	  Dark style + tones that's easy on the eye
// @author        Timskii
// @homepage      http://
// @include       http://4chan.org/*
// @include       https://4chan.org/*
// @include       http://*.4chan.org/*
// @include       https://*.4chan.org/*
// ==/UserScript==

(function() {
var css = "body { background: #121212 !important; color: #f1f1f1 !important; }\n	* { font: 10pt \"helvetica\"; }\n	a { color: #83c2d7 !important; }\n	hr { display: block; border: 1; width: 50%; border-color: #2d2d2d; !important; }\n	#navtop, #navbot { background: #262626; color: #000 !important; width: 100%; text-align: center; height: 12pt; font-size: 10pt !important; }\n	#navtop *, #navbot * { color: #f1f1f1; font-size: 10pt; display: inline; }\n	#navtop a:hover, #navbot a:hover { background: #555; }\n	form { margin: 1em; }\n	.inputtext, textarea { width: 295px; }\n	.rules { display: none; }\n	td.postblock { background: #262626 !important; border: 1px solid #262626 !important; color: #aaa !important; }\n	td.postblock * { font-size: 9pt; }\n 	td.reply, td.replyhl { background-color:#262626 !important; border: 2px solid #121212 !important; color: #f1f1f1 !important;-moz-border-radius: 7px; }\n	td.replyhl { background-color:#262626 !important; border: 1px solid #6e6e6e !important;	color: #f1f1f1 !important; }\n	.postername, .filesize, .filesize a, a.linkmail, a.quotejs, .replytitle, .commentpostername, .abbr { color: #f1f1f1 !important; font-size: 9pt;}\n	span.filetitle { color: #83c2d7 !important; font-size: 10pt; font-weight: normal;}\n	span.omittedposts { color: #121212 !important; font-size: 0pt;}\n	span.filetitle, .replytitle { color: #cc1105 !important; }\n	#hd, font[size=\"1\"], font[size=\"2\"], #ft, #filter-button, #option-button, #navtopr, #navbotr, .logo,.logo font b span, .doubledash, img.rotating, input[type=\"button\"], td[align=\"right\"] { display: none !important; }\n	.pages { background: #262626 !important; border: 1px solid #2a2a2a !important; }\n	.pages td { color: #444 !important; font-size: 4pt; }\n .pages td b { color: #f1f1f1 !important; font-size: 10pt; }\n	.pages td b { background-color: #353535; }\n	.pages input { display: none !important; }\n	.pages td:first-child { display: none;}\n	pre, textarea, input:not([type=\"button\"]):not([type=\"checkbox\"]):not([type=\"submit\"]):not([type=\"reset\"]), select { font-size: 9pt ! important; color: #fff !important; background: #262626 !important; border-color: #262626 !important; }\n	input[type=\"submit\"] { background: #262626 !important; color: #aaa !important; border: 1px solid #262626; -moz-appearance: none; font-size: 7pt; }\n	th { background: #262626 !important; }\n	th font { font-size: 7pt; }\n	input[type=\"file\"] { opacity: 0.12 !important; }\n	td.deletebuttons { font-size: 10pt !important; color:#f1f1f1 !important; }";
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

var allLinks, thisLink;
allLinks = document.evaluate(
    '//span[@class="commentpostername"] | //span[@class="postername"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
   var red = Math.floor();
   var green = Math.floor();
   var blue = Math.floor(); 
    thisLink.style.color = '()';
    thisLink.innerHTML = "";
}

allLinks = document.evaluate(
    '//span[@class="commentpostertrip"] | //span[@class="postertrip"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.color = "#a94646";
    thisLink.style.fontSize = "12";
    thisLink.innerHTML = "";
}s