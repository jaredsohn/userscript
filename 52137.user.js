// ==UserScript==
// @name           Facebook chat bar layout cleaner
// @namespace      http://mike.thedt.net
// @description    Hides the following things from the Facebook chat bar: "Applications" text, change language,  bookmarked applications, "Bookmark this application", "Chat" text.
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

//Automatically set the width of the "Chat" tab
GM_addStyle("#fbDockChatBuddylistNub { width: auto !important; }");

//Hide the "Chat" text
GM_addStyle(".fbNubButton .rule .label { font-size: 0px;}");
GM_addStyle(".fbNubButton .rule .label .count { font-size: 11px; }");
GM_addStyle(".og .fbDockChatBuddyListNub .label { display: inline; }");

//Uncomment the line below to hide the online/offline icon
//GM_addStyle("#fbDockChatBuddylistNub .icon { display: none; }");

//Hide translations button
GM_addStyle("#fbTranslationsNub { display: none; }");