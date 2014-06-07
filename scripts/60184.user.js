// ==UserScript==
// @name           Google Calendar Show All Sidebar Calendars
// @namespace      http://www.michaelvastola.com/
// @description    Removes scrollbars and displays all calendars in the sidebar.  Moves search public calendars up to top.  Skeleton taken from Arthaey Angosii's Script.
// @include        http*://www.google.com/calendar/*
// ==/UserScript==


function extendCalMenus()
{
	GM_addStyle("#calendars_my { height: auto !important; overflow: hidden !important; white-space: nowrap !important;}");
	GM_addStyle("#calendars_fav { height: auto !important; overflow: hidden !important; white-space: nowrap !important}");
}

extendCalMenus();