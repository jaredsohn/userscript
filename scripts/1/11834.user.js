// ==UserScript==
// @name           Facebook message alert
// @namespace      facebook.com
// @description    Makes the "inbox" appear orange when you've got new messages
// @include        http://*.facebook.com*
// ==/UserScript==

if (document.getElementById("nav_inbox")) if (document.getElementById("nav_inbox").innerHTML != "Inbox") document.getElementById("nav_inbox").style.backgroundColor = "#fa5";