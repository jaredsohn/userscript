// Refresh Forum Script
// version 1.2
// 04/11/07
// Copyright (c) 2007, Darren Kopp
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Refresh Unread
// @namespace      http://www.theopgclan.com/
// @description    Refreshes the current "Search" view you are on. 
// @include        */index.php?action=unread
// @include        */index.php?action=unread;all;*
// @include        */index.php?action=unreadreplies
// ==/UserScript==


// refresh the window every minute
window.setTimeout(function() { window.location = window.location }, 60000);