// ==UserScript==
// @name            YouTube to BlueTube
// @info           Transforms YouTube to BlueTube
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==


(function() {
var css = "";
if (false || (document.domain == "youtube.com" || document.domain.substring(document.domain.indexOf(".youtube.com") + 1) == "youtube.com"))
	css += " !important;\n }\n\n.video-list-item .title{\n\ncolor: #1c62b9 !important;\n}\n\n.watch-view-count strong {\n\nfont-family: Century Gothic !important;\nfont-weight: bolder !important;\nfont-style:  !important;\nfont-size: 210% !important;\n}\n\n.feedmodule-smtitle-wrapper, #homepage-main-content .feedmodule-smtitle, #homepage-main-content, #homepage-main-content .top-videos-module .video-list-item .title {\n\nfont-size: 12px;\nfont-weight: normal;\ncolor: #333;\n}\n\n\n#masthead-nav a, #masthead-user a {\n\ncolor: #1c62b9 !important;\n}\n\n#watch-action-confirmation #watch-action-response-message {\n\ncolor: #000000 !important\n}\n\n.masthead-user-username {\n\ncolor: #1c62b9  !important;\n}\n\n#watch-description {\n\ncolor: #000000 !important;\n}\n\n#watch-action-confirmation #watch-action-response-message {\n\ncolor: #000000 !important;\n}\n\n.comment {\n\ncolor: #000000 !important;\n}\n\n	body {\n		background: #104E8B !important;\n    color: #000000 !important; no-repeat;\n		background-position: right bottom;\n		background-attachment:fixed;\n   }";
if (false || (document.domain == "upload.youtube.com" || document.domain.substring(document.domain.indexOf(".upload.youtube.com") + 1) == "upload.youtube.com"))
	css += "body {\n\ncolor: #000000 !important;\n}";
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

(function () {
var idlogo = document.getElementById('logo');
logouri = "http://www.heartwebsite.org/Images/youtubeBlue.png";
idlogo.alt="YouTube home";
idlogo.class="noni";
idlogo.src=logouri;
})();

(function() {
var css = "body {\n    background: #104E8B !important;\n    background-image: url() !important;\n    }\n#masthead-container, #footer-container {background: #104E8B !important;}\n#page.watch-branded #watch-sidebar, #page.watch-branded #watch-main-container {\n    background: #104E8B !important;\n    }\n\n\n.guide, #channel {\n    background-color: #104E8B !important;\n    border-bottom: 1px solid #104E8B !important;\n    }\n.guide-background {background: #104E8B !important;}\n.guide-item {\n    background: #104E8B !important;\n    color: #292929 !important;\n    }\n.guide-item-container {\n    border-bottom: 1px solid #104E8B !important;\n    border-top: 1px solid #104E8B !important;\n    }\n.guide-item.selected, .guide-item.selected:hover {\n    color: #292929 !important;\n    background-color: #104E8B !important;\n    border-right-color: #3366CC !important;\n    }\n#page h3.guide-item-container.selected-child, #page h3.guide-item-container:hover {\n    border-top: 1px solid #104E8B !important;\n    }\n\n\n\n#feed .feed-header {\n    background: -moz-linear-gradient(center top , #104E8B 0pt, #104E8B 100%) repeat scroll 0 0 #104E8B !important;\n    color: #000000 !important;\n    }\n#guide-builder-promo {background: none repeat scroll 0 0 #104E8B !important;}\n#subscription-manager-header {\n    color: #212121 !important;\n    background-color: #104E8B !important;\n    background-image: none !important;\n    }\n\n\n#subscription-manager {background: #104E8B !important;}\n#subscription-manager .subscription-item:hover {\n    background: #104E8B !important;\n    color: #212121 !important;\n    }\n#subscription-manager .subscription-item.odd {background:#104E8B
!important;}\n\n\n#subscriptions-full ul li:nth-child(1) {display:none !important;}\n#subscriptions-full ul li:nth-child(2) {display:none !important;}\n.yt-uix-expander-collapsed .guide-item-container.hideable {display:block !important;}\n.guide-show-more-less {display:none !important;}\n.guide .guide-section:nth-child(n+3) {display:none !important;}";
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