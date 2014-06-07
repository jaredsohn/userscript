// ==UserScript==
// @name           Link to PM
// @namespace      http://userscripts.org/forums/1/topics/2113
// @description    Adds a link to your private messages
// @include        http://www.pocketfives.com/*
// ==/UserScript==

var lnk = document.createElement('a');
lnk.href = "http://www.pocketfives.com/user/PrivateMessages/default";
lnk.textContent = "Private Messages";
lnk.id = "myNewLink";

// just to make it look similar to other links
GM_addStyle("#myNewLink {\
color: blue; \
font-size: 9px; font-weight: bold; \
height:17px; text-decoration: none; \
padding-left:5px; margin-left:5px;}");

// add the new link to the left sidebar
document.getElementById("links").appendChild(lnk);