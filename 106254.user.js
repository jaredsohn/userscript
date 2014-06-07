// ==UserScript==
// @name           Facebook add toggleable chat tabs
// @namespace      http://mike.thedt.net
// @description    Allows you to easily toggle between minimized and maximized chat window states on the new Facebook chat
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.2
// ==/UserScript==

//fix chat windows
GM_addStyle(".fbDockChatTab { height: 0px !important; }");
GM_addStyle(".fbDockChatTab.openToggler .fbNubButton { display: block !important; }");