// ==UserScript==
// @name          Feedly Minimal
// @namespace     http://userstyles.org
// @description	  Fullscreen mode, no ads and recommendations, better view
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://*.feedly.com/*
// @include       https://*.feedly.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
    var css = "div#feedlyFrame { width : 100% !important;}" 
    		+ "#storeHolder { right:0px !important; margin-left: 0 !important; } "
    		+ ".u0Entry .title.read { color: #979797 !important; font-weight: normal; padding: 7px; background: F0F0F0 !important; } "
            + "div#feedlyPart { width : 100% !important;}" 
            + ".inlineFrame .selectedEntry { padding: 3px 20px !important; border: 20px solid #fff !important;} "
            + "div.inlineFrame {background: #eee !important; padding: 0px 0px 0 100px !important !important; background-image: none !important; } "
            + "div#feedlyPage, div#mainArea { width: 100% !important;}"
            + "div#sideArea, div#floatingBar, #systemBar, #section0 { display: none !important; }"
            + "div#feedlyPart0 {margin-left: -10px !important; margin-right: -5px !important; }"
            + "div#feedlyPart {margin-left: -25px !important; padding-top: 8px;}"
            + "div#feedlyPart #feedlyPage {margin-top: 0px !important;}"
            + "div.pageActionBar {margin-top: -30px !important;}"
            + "div.sourceinfo {width: 8% !important; margin-left: -5px !important;}"
            + "span.nbrRecommendations {color: grey !important; line-height: 25px !important;}"
            + ".u0Entry { height: 27px !important; font-size: 12px !important; }"
            + ".u0Entry .title { font-size: 13px !important; color: black !important; line-height: 25px !important;}"
            + ".u0Entry .title.read { color: grey !important;}" 
            + "h2 { margin-top: 11px !important;margin-bottom: 5px !important; color: #35a7ff !important; padding-left: 28px;}"
            + "#feedlyTabsHolder{ margin-left: 0 !Important; margin-top:0px !important; height:100% !important; }"
            + "#feedlyTabs { height:100% !important; }"
            + "*.action { color: #35a7ff !important; } #who .actions .action {color:rgba( 255, 255, 255, 0.55 ) !important;}";
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
