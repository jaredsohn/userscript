// ==UserScript==
// @name GizmodoCleanner
// @namespace fr.local.gizmodo.cleane
// @version 1
// @match http://www.gizmodo.fr/*
// @match http://gizmodo.com/*
// @copyright 2014+
// ==/UserScript==

(function(){
GM_addStyle("div.smart_ad, #masthead, #colophon, .topstories, .timelineBar, .tagTime, .ad.element {display:none;height:0;width:0;}");
GM_addStyle(".widget, .small, .relatedStoriesBox, #help-question, #comments, #itwebtv-box {display:none;height:0;width:0;}");
GM_addStyle("#ebuyclub-ad, #entry-social-sharing, .tag-links, #post-ebuyclub, .home #content .big .entry-meta .entry-excerpt p {display:none;height:0;width:0;}");
GM_addStyle(".home .site-main,.hide-for-small, .referenced-wide {padding: 0;}");
GM_addStyle("body {padding-top: 0;}");
GM_addStyle("img.attachment-home-thumb-important.wp-post-image, .home .big .entry-thumbnail img {min-height:222px;height:222px;width:340px;}");
GM_addStyle(".home #content .story.element.big {height: 300px;}");
GM_addStyle(".site {margin:0 auto;}");
GM_addStyle(".home .paging-navigation {padding: 10px;}");
})();