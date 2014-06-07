// ==UserScript==
// @name          Disable Reddit Sidebar (click to enable)
// @namespace     deodrus
// @description	  Disables the reddit sidebar by default and re-enables if tab-menu option is clicked.
// @include       http://*.reddit.com/*
// ==/UserScript==

// === DISABLES SIDEBAR BY DEFAULT === 

$('div.side').each(function(){var t=$(this);if(t.children().length > 0)t.prev().find('ul.tabmenu').append($('<li></li>').append($('<a href=\"#\"><font color=\"#616296\">toggle sidebar</font></a>').click(function(e){t.children('div').toggle();e.preventDefault();})))}).children('div').toggle()()
