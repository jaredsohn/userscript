// ==UserScript==
// @name          Bobby's 4chan
// @namespace     http://userstyles.org
// @description	  :3
// @author        Alex Diehl
// @homepage      http://userscripts.org/scripts/show/69623
// @include       http://4chan.org/*
// @include       https://4chan.org/*
// @include       http://*.4chan.org/*
// @include       https://*.4chan.org/*
// ==/UserScript==
(function() {
var css = "body\n{ \n	background: #000 !important;\n	color: #cff !important;\nbackground-image:url('http://i40.tinypic.com/muyl8o.jpg') !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important;\n        font-size: 100% !important;\n}\n\n\n\n\nbody, .navtop, .replyhl, .reply, a, a:hover, a.quotejs, a.quotejs:hover, a.quotelink, span.filesize {font-family: \"VL PGothic\", \"Verdana\", Sans-Serif !important; } \n\n\n\n::-moz-selection {\n	background: #447;\n        color: #fff;\n}\n\n\nhr{display:none !important;}\nhr { border-color: #444 !important; }\nform hr{display:block !important;}\n\n\n\nth[bgcolor=\"#e04000\"]\n{ \n	display:none;\n}\n\n\n \n\n[title=\"Anime & Manga\"] {color: #fcf !important;}\n[title=\"Hentai/Alternative\"] {color: #ff0 !important;}\n[title=\"Technology\"] {color: #ea0 !important; }\n[title=\"Health & Fitness\"] {color: #0F0 !important;}\n[title=\"High Resolution\"] {color: #f00 !important; }\n[title=\"Wallpapers/General\"] {color: #cc8 !important;}\n[title=\"Otaku Culture\"] {color: #f0f !important; }\n\n\n\n\nb { color: #f00 !important; }\n\n\ntd { color: #dd3 !important; }\n\n\n.doubledash {color: #dd3 !important;}\n\n\na {color: #499DF5 !important; }\n\n\n.oldpost { color: #f00 !important; font-size: 80%;} \n\n\n\n.filesize { color: #bb3 !important;}\n\n\n\n.filetitle, .replytitle { color: #f44 !important;  font-size: 95% !important; }\n\n\n\na:hover { color: #0f0 !important; }\n\n\n\ntextarea, .inputtext {table-layout:auto; width: 500px; height: 20px !important; vertical-align: top !important; }\n\n\n[value=\"Submit\"] { height: 20px !important; width: auto !important; vertical-align: top !important; }\n\n\n\n.abbr { color: #195 !important; }\n\n\n.quotelink { color: #ab8fff !important;}\n\n\n.quotelink:hover { color: #5f9 !important; }\n\n\n.quotejs {color: #ccc !important;}\n\n\n.postblock  {\n     border-color: #000000 !important; \n	-moz-border-radius: 10px 0 0 10px !important;\n	vertical-align: top !important;\n	text-align: right !important;\n	background-color: #999 !important;\n}\n\n\n.postblock b { color: #000 !important;}\n\n\nblockquote { font-size: 80% !important; }\n\n\ntextarea.inputtext { height: 100px !important; }\n\n\n.commentpostername a.linkmail[href=\"mailto:sage\"] { color: #f44 !important;  }\n\n\n.commentpostername a.linkmail[href=\"mailto:sage\"]:after { content: \" (sage)\"; color: #f44 !important }\n\n\n.deletebuttons .inputtext { width: 100px !important; -moz-border-radius: 10px !important; }\n\n\n\n.reply, .replyhl {\n	border: 1px solid !important;\n        -moz-border-radius: 1em/1em;  \n	color: #cff !important;\n	padding: 0px 0px 0px 0px !important;\n	font-size: 100% !important;\n}\n\n\n.reply {\n	background-color: #333 !important;\n	padding-right: 10px !important;\n	border-color: #069 !important;\n	border-width: 1px !important;\n        \n}\n\n\n.replyhl {\n	background-color: #555 !important;\n	border-color: #fff !important;\n	padding-right: 10px !important;	\n}\n\n\n.pages {\n	background-color: #222 !important;\n	border-width: 0px !important;	\n}\n\n\n.pages b {color: #f00 !important;}\n\n\n.omittedposts {\n     color: #bb3 !important;\n}\n\n\n.postername, .commentpostername, .linkmail:not([href=\"mailto:sage\"]) {\n	color: #5cf !important;\n}\n\n\n.postertrip {\n	color: #58f !important;\n}\n\n\n\n\n\n\n.unkfunc { color: #7f6 !important; }\n\n\n\n.postername [style^=\"color: rgb(128, 0, 128)\"] { color: #99f !important; }\n.commentpostername [style^=\"color: rgb(128, 0, 128)\"] { color: #99f !important; }\n\n\n\n.postername [style^=\"color: rgb(240, 0, 0)\"] { color: #f0f !important; }\n.postertrip [style^=\"color: rgb(255, 0, 0)\"] { color: #f0f !important; }\n.commentpostername [style^=\"color: rgb(240, 0, 0)\"] { color: #f0f !important; }\n\n\n\n.logo {display: none !important; }\n.rules {display: none !important;}\n\n\n\n.box-outer {background-color: #000 !important;}\n\n\nimg[src*=\"http://static.4chan.org/support\"]{ display:none !important; }";
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