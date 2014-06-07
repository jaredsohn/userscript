// ==UserScript==
// @name           Filter Political Shacknews
// @namespace      http://mcjohn.org
// @description    Filters Political Posts 
// @include        http://www.shacknews.com/chatty*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Hide all political posts.
$(".fpmod_political").parent().hide();
