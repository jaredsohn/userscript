// ==UserScript==
// @name           afu
// @namespace      afu
// @version        0.0.3
// @description    remove unused ads
// @include        http://livebeta.kaskus.us/*
// What it does:
//  -Set post text color from grey to black
//  -Set post background color from white to vbulletin's blue
//  -Set post list link color to black
//  -Set post and quote text font to verdana
//  -Set post header background to dark blue
//  -Set FJB post header background to darker color
//  -Remove Header
//
// Changelog:
// V 0.0.1
// Remove header #site-header h1 img {display:none !important;}
// .col{display:none !important;}
// ==/UserScript==

GM_addStyle("body { color: black; background-color:#EAE5CE; } .create-new-act {display:none !important;} .recommended-thread .item {display:none !important;} .recommended-thread {display:none !important;} a.link_thread_title {color: #151b54 !important;} a.link_thread_title {color: #15317e !important;} #site-header h1 a{display:none !important;} .banner-top-ads {display:none !important;} .notice-featured {display:none !important;} #butt_info a{display:none !important;} #butt_rsvp a{display:none !important;}  #thread-content .thread-author {padding: 0px 20px 0 !important;} #thread-content .thread-author .figure .photo {display:none !important;} #thread-content .thread-author .title,#thread-content .thread-author .info {display:none !important;} #thread-content .entry-content h1 {font-size: 16px !important; line-height: 20px !important;} #thread-content .entry-content {font-size: 13px !important; padding: 10px 10px 10px 10px !important;} table#forum-home-table tbody td{padding: 5px !important;} a.jump {display:none !important;} #header-forum.header.header-home {display:none !important;} .quick-reply label, .quick-reply legend, .quick-reply .reply-title,  {display:none !important;} #thread-content .search-post-entry table td {padding: 0px !important;} #thread-content .search-post-entry table h4 a {color: #15317e !important;} ::selection {color: #ffffff !important; background: #15317e !important;} ::-moz-selection {color: #ffffff !important; background: #15317e !important;} #sidebar-search-result .header {padding: 0px !important;}");