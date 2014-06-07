// ==UserScript==
// @name        My Forbes
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Forbes.com
// @include     http://www.forbes.com/*
// @version     1
// @grant		GM_addStyle
// ==/UserScript==

setTimeout('goBack()',0);
GM_addStyle('body {background: #fec !important}');
GM_addStyle('a:visited {color: #505 !important}');
GM_addStyle('.date {color : #b60 !important; font-weight: bold !important}');
GM_addStyle('#follow_bar, .universal-footer, .contrib_meta, .sub_links, .article_actions, .edittools-item, .comment_count, .comment_bug, #comments, .reason, .related_searches,.follow_unireg, .video_block, .real-time-billionaires, .controls, .top_link_strip {display: none !important}');

//