// ==UserScript==
// @name           Facebook Bar - Cleaned Up
// @namespace      http://userscripts.org/users/115697
// @description    Hides the following things from the Facebook chat bar: Applications text, change language, Bookmark this application, "Chat" text.
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

//Automatically set the width of the "Chat" tab
GM_addStyle("#presence #buddy_list_tab { width: auto !important; }");

//Hide the "Chat" text
GM_addStyle("#buddy_count { font-size: 0px; }");
GM_addStyle("#buddy_count .buddy_count_num { font-size: 11px; }");

//Uncomment the two lines below to hide the online/offline icon
//GM_addStyle("#presence #buddy_list_tab .spritemap_icons.sx_icons_buddy_list { display: none; }");
//GM_addStyle("#presence #buddy_list_tab .buddy_icon { display: none; }");

//Hide translations button
GM_addStyle("#presence_bar #translations_nub { display: none; }");

//Hide "Bookmark application"
GM_addStyle("#presence #bookmarkable_app { display: none; }");

//Hide "Applications" text
GM_addStyle("#presence #presence_applications_tab { font-size: 0px; width: 16px !important; padding 0 6px;}");