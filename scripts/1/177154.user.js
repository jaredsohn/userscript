// ==UserScript==
// @name                3DG+
// @namespace           https://userscripts.org/users/232050
// @description         Making 3DG a better place
// @version             1-030913
// @include             http://foros.3dgames.com.ar/*
// @include             http://profiles.3dgames.com.ar/*
// @grant               GM_addStyle
// ==/UserScript==

/* make it wide, fixed width in hell */

GM_addStyle("body { width:100% !important; }");
GM_addStyle("div.body_wrapper { width:95% !important; }");

/* Removing general shit */

GM_addStyle("div#navbar { display: none !important; }");
GM_addStyle("div#forum_info_options { display: none !important; }");
GM_addStyle("div.below_body { display: none !important; }");
GM_addStyle("div#footer_3dg { display: none !important; }");
GM_addStyle("div#footer { display: none !important; }");
GM_addStyle("div#cometchat_hidden_content { display: none !important; }");
GM_addStyle("div#cometchat { display: none !important; }");
GM_addStyle("div.thread_info { display: none !important; }");
GM_addStyle("div#social_shares_3dg { display: none !important; }");

/* Removing ads */

GM_addStyle("div#top_ad_bg { display: none !important; }");
GM_addStyle("div#tv_ads_wrapper { display: none !important; }");
GM_addStyle("div#interpost_ad_wrapper { display: none !important; }");
GM_addStyle("div#footer_ad_wrapper { display: none !important; }");

/* Making postbit pretty and simple */
GM_addStyle("div.after_content { display: none !important; }");
GM_addStyle("h2.title { display: none !important; }");
GM_addStyle("span.usertitle { display: none !important; }");
GM_addStyle("dl.userinfo_extra { display: none !important; }");
GM_addStyle("a.report { display: none !important; }");