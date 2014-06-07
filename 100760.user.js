// ==UserScript==
// @name          Perfect Gooder beta
// @namespace     http://userstyles.org
// @description	  Optimized Google Reader for Persian (farsi) language
// @author        Siavash Keshmiri
// @homepage      http://userscripts.org/users/111260
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// @include       http://www.google.com/reader/shared*
// @include       https://www.google.com/reader/shared*
// ==/UserScript==

(function() { 
var css = "*{font-family:Tahoma, Geneva, sans-serif; !important; text-decoration:none !important; font-size:11px !important;} #entries{font:11px Tahoma, Geneva, sans-serif; !important;}#chrome-title {font: bold 22px Arial !important;}.entry-title {font-weight: 100 !important; color:#0000cc !important;}#overview .title{font-size:12px !important; font-weight:100 !important; direction:rtl !important;}.item-body h1, .item-body h2, .item-body h3 {font: bold 15px Arial !important;}.item-body ul li {list-style: square !important;}.scroll-tree li a .name{color: #999999 !important;} .scroll-tree li a .name-unread {font-weight: 100 !important; font-size:9px !important; color:#000 !important;}#overview .overview-header{direction:rtl !important;} #chrome-header{padding-top:0!important; padding-bottom:0 !important;}#viewer-top-controls{padding-top:2px!important; padding-bottom:0 !important;}.entry .entry-title .entry-title-go-to,#entries.list .collapsed .entry-main .entry-original{padding-bottom:2px !important; transform:rotate(180deg);-o-transform:rotate(180deg);-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);}.samedir #entries.list .collapsed .entry-secondary{padding-bottom:3px !important;}#entries.list .collapsed .entry-main .entry-original{padding:1px !important; padding-top:0 !important;}#entries.list .collapsed .entry-date{padding-top:1px !important;}#overview .overview-segment{ text-align:right !important;}#overview .overview-segment img {float:none !important;}.entry .entry-body, .entry .entry-title, .entry .entry-likers {max-width: none!important;} .entry-main{ padding-right:20px !important;}#entries.list .collapsed .entry-main .entry-source-title div{padding-bottom3px!important;} .entry-comments .entry-comment, .entry-comments .edit-comment { direction: rtl !important; max-width: none !important;}.entry-conversation .comments-container, .comment-entry-comments .entry-comments, .comment-entry .entry-snippet{max-width: none !important; padding-right:20px !important;} .entry-comments .comment-add {direction:rtl !important;} .add-comment-text-area{direction:rtl !important;} .add-comment-buttons .goog-button-float-left{float:right !important;} .n-comments-info{text-align:right !important;} #entries.list .collapsed .entry-main .entry-source-title div{padding-bottom:2px !important;} ";
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

