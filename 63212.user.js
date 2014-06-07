// ==UserScript==
// @name           Close tab automatically by domain
// @namespace      http://userscripts.org/scripts/show/63212
// @description    User Edited domain auto-closer, please read the comments in the greasemonkey script!
// @include        http://example.com/*
// ==/UserScript==

//This is a stupidly easy one liner, but what this script does is very big and also to make it work requires a lot of user editing (for now, I plan to make this into an extension)
//To make it work at all, it requires a slight change in the Firefox configuration:
//1. Go to address bar and type about:config
//2. Go to parameter dom.allow_scripts_to_close_windows
//3. Set its value as true
//Next, for every website you want to close when opened, add under/edit the //@include line with whatever domains you want.
//The example closes ALL PAGES under http://example.com, but not https://example.com or http://example.example.com
//So you can make it like this:
// @include http*example.com/*
//In other words, wildcards are your friend.
//Why make this?  There are some popups that get through Adblock/Firefox Popup-blocker/Noscript.  So I just kill them with this.  I made it for utility but I released it for the world to enjoy.
window.close();
