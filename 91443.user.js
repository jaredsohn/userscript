// ==UserScript==
// @name          Torrentleech - easy on the eyes
// @description	  A smooth theme, making reading the page easy
// @author        Vaim
// @homepage      http://userstyles.org/scripts/show/91443
// @include       http://torrentleech.org/*
// @include       https://torrentleech.org/*
// @include       http://www.torrentleech.org/*
// @include       https://www.torrentleech.org/*
// ==/UserScript==
(function() {
var css = "\
body\n{\nbackground: #222222 !important;\n}\n\n\
#main \n{\nborder-left: 0px solid #C0C0C0 !important;\nborder-right: 0px solid #C0C0C0 !important;\n}\n\
#main\n{\nbackground: #222222 !important;\ncolor: #909090 !important;\nborder-left: 2px solid #c0c0c0;\nborder-right: 2px solid #c0c0c0;\n}\n\
p, h2\n{\ncolor: #859292 !important;\n}\n\n\
IMG[src=\"http://static2.torrentleech.org/images/tltop.png\"]\n\n\n\
a,td a\n{\ntext-decoration: underline !important;\n}\n\n\n\n\
.newicon\n{\ncolor: red !important;\n}\n\
.row_selected, .highlighted\n{\nbackground: transparent !important;\n}\n\n\n\
TABLE#torrenttable  TR > TD + TD + TD.quickdownload + TD + TD + TD + TD,\nTABLE#torrenttable  TR > TD + TD.name + TD.quickdownload + TD + TD + TD + TD + TD\n{\ncolor: white !important;\ntext-align: right !important;\nfont-weight: 900 !important;\n}\n\n\
TABLE#torrenttable th\n{\nbackground: #1C1C1C !important;\n\nborder-bottom: 1px black !important;\n}\n\n\n\n\n\n\
#navbar\n{\nbackground: url(\"http://i.imgur.com/MaF7w.jpg\") repeat-x scroll center top transparent !important;\n\nheight: 33px; padding-left: 51px; padding-right: 1px;\n}\n\
#dropdown > li > a:hover \n{\nbackground-color: #222222;\n}\n\n\
#dropdown > li > a\n{\nbackground-image: url(\"http://i.imgur.com/TIxQG.jpg\") !important;\n}\n\n\n\
#memberBar\n{\nmargin-top: -1px !important;\nwidth: 1000px !important;\nbackground: #222222 !important;\n-moz-border-radius: 0px !important;\ncolor:  !important;\n}\n\
.downloaded\n{\ncolor: red !important;\n}\n\n\n\
fieldset, #supportTorrentLeech\n{\nbackground: #222222!important;\ncolor: #505050 !important;\n-moz-border-radius: 1em !important; \nborder: solid 1px #c0c0c0 !important;\n}\n\
legend, fieldset a\n{\nbackground: #222222!important;\ncolor: white !important;\n}\n\n\
input\n{\n\n-moz-border-radius: 1em !important; \nbackground-image: -moz-linear-gradient(top, white, white) !important;\n\n}\n\
.ui-state-default, .ui-widget-content .ui-state-default \n{\nbackground: url(\"http://i.imgur.com/ekDq4.jpg\") repeat-x scroll 50% 50% #0F1F25 !important;\n}\n\n\n\n\n\
IMG[src^=\"/nfos/\"]\n{\nbackground: black !important;\n}\n\n\
.fg-toolbar\n{\nbackground: #666666 !important;\n}\n\n\
#left, #torrentImg\n{\nbackground: #222222!important;\nbackground-image: none !important;\ncolor: black !important;\n}\n\
BUTTON\n{\nbackground: #616161 !important;\ncolor: #222222 !important;\n}\n\n\
#torrentDetails, #torrentTabs\n{\nbackground: #e7e7e7 !important; \n}\n\n\
#torrentDetails > H3\n{\ncolor: black !important;\n}\n\n\
#torrentTabs tr.even>td\n{\nbackground: #222222 !important;\ncolor: black !important;\nborder-top: 1px solid #c0c0c0 !important;\n}\n\
#torrentTabs tr.odd>td\n{\nbackground: #222222!important;\ncolor: black !important;\n}\n\
DIV#torrentTabs > UL\n{\nbackground: #1C1C1C !important;\n}\n\
DIV#torrentTabs LI>a\n{\nbackground: #1C1C1C !important;\n}\n\
DIV.commentText > A, DIV.commentText > FONT, DIV.commentText > FONT > A\n{\ncolor: #2f5c35 !important;\n}\n\n\
#left [class*=\"ui-corner-\"]\n{\n-moz-border-radius: 0em !important; \nmargin: 1px !important;\ncolor: black !important;\n}\n\
#torrent [class*=\"ui-corner-\"]\n{\n-moz-border-radius: 0em !important; \nborder: none !important;\n}\n\n\n\
#comments_textarea, [style=\"display: block; z-index: 1002; outline: 0px none; position: absolute; height: auto; width: 400px; top: 437.8px; left: 509px;\"]\n{\nbackground: #222222 !important;\n}\n\
#supportTorrentLeech { display: none !important;width:95% !important;margin:0.2em auto !important;border-radius:0.5em !important;padding:0.15em 0 !important;}\n\
#main > p.pagination {margin: 11px -300px 0 -18em!important;display:inline-block !important;}\n\
#main > .torrentTools {float:right !important;padding:0 !important;margin: 0.6em 2.3em !important;}\n\
#main > .clearfloat { clear: none !important; }\n\
#searchtorrents, #filtertorrents, #facets \n{\nmargin-top: 0 !important;}\n\
.ui-widget-header { background:url(\"http://i.imgur.com/JHWoq.jpg\") repeat scroll 50% 50% #222222;border:1px solid #1C1C1C;}\n\
.ui-widget-content {background: none repeat-x scroll 50% bottom #222222;border:1px solid #1c1c1c;}\n\
#profile #left {border:1px solid #222222;}\n\
#profileTable td, .editProfileTable td {border-bottom:1px dotted #222222;}\n\
#profileTable, .editProfileTable {border:1px dashed #222222;}\n\
#profileTable tr, .editProfileTable tr {border-bottom:1px solid #1C1C1C;}\n\
tr.even {background-color:#1C1C1C;}\n\
#torrentDetails, #torrentTabs {background:none repeat scroll 0 0 #1C1C1C !important;}\n\
#torrentDetails > h3 {color:white !important;}\n\
#torrentTabs tr.odd > td {color:white !important;background:none repeat scroll 0 0 #222222 !important;border-top:1px solid #C1C1C1 !important;border-top:1px solid #222222 !important;}\n\
#torrentTabs tr.even > td {color:white !important;background:none repeat scroll 0 0 #1c1c1c !important;border-top:1px solid #222222 !important;}\n\
#index_sidebar {background:none repeat scroll 0 0 #1C1C1C;}\n\
.ui-widget {font-family:Arial,sans-serif;font-size:11px;}\n\
#torrentTable tr, .edittorrentTable tr {border-bottom:0px dotted #1c1c1c;}\n\
#torrentTable, .edittorrentTable {border:0px dashed #1C1C1C;}\n\
#torrentTable td, .edittorrentTable td {border-bottom:0px dotted #222222;}\n\
table.display td {border-bottom:0px solid #1C1C1C;}\n\
#middle {height:163px;margin-left:6px;overflow:hidden;width:1000px}\n\
#torrent [class*=\"ui-corner-\"] {-moz-border-radius:6px 6px 6px 6px !important;}\n\
.ui-button .ui-button-text {color:white;}\n";
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
