// ==UserScript==
// @name          new.livestream Wide 
// @icon        http://i.imgur.com/ZtbEgJG.png
// @namespace     http://userstyles.org
// @description	  wide player for recorded videos
// @author        BskyB
// @version	2013.10.28
// @homepage      http://userstyles.org/styles/85173
// @require    http://usocheckup.dune.net/170160.js
// @downloadURL		https://userscripts.org/scripts/source/170160.user.js
// @updateURL		https://userscripts.org/scripts/source/170160.meta.js
// @include       http://new.livestream.com/*
// @include       https://new.livestream.com/*
// @include       http://*.new.livestream.com/*
// @include       https://*.new.livestream.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".iframe-wrapper {\nheight: 532px !important;\nwidth: 940px !important;\n}\n.post_content.clearfix {\nwidth: 940px !important;\n}\n.social-status, .sidebar, .event_header.fixed, #widget.fixed, #back_to_top {\ndisplay: none !important;\n}\n.actions, .live-header {\nmargin-left: 250px !important;\n}\n#event .event_live .content-meta .actions {\nwidth:82% !important;\n}\n\n.embed-wrapper.clearfix {\nheight: 640px !important;\n}\n#event .event_live .combo-wrapper .player-wrapper {\npadding:0px 0px 0px 5px !important;\nwidth: 1136px !important;\nmax-width: 1136px !important;\n}\n#player_embed {\nwidth: 1132px !important;\nmax-width: 1132px !important;\nheight: 640px !important;\npadding:0px 0px 0px 5px !important;\n}\n.combo-wrapper.clearfix {\nwidth: 1438px !important;\nmargin-left: -244px !important;\n}\n#chat {\n    width: 279px !important;\n    height: 619px !important;\nmargin-right: -4px !important;\nmargin-top: 0px !important;\n}\n#chat_messages {\nwidth: 285px !important;\nmargin-left: -9px !important;\n}\n#event .live-scroll.fixed {\nmargin-right:-11600px !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();