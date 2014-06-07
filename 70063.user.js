// ==UserScript==
// @name           Delete User CSS
// @namespace      diary.ru
// @include        http://*.diary.ru/*
// ==/UserScript==

GM_registerMenuCommand( "Delete User CSS", function(){ document.styleSheets[1].disabled=true; document.styleSheets[2].disabled=true; } );

