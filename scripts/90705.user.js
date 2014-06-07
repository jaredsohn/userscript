// ==UserScript==
// @name           RFD Forums - Right Sidebar issue fix
// @namespace      http://userscripts.org/users/238624
// @description    Fixes the blank space issue when the sidebar is configured to appear on the right side
// @include        http://forums.redflagdeals.com/*
// @author         RenegadeX
// @version        1.1
// ==/UserScript==

// DEPRECATED due to forum fix Nov 22 2010
alert("**GREASEMONKEY SCRIPT ALERT**\n\nThe 'RFD Forums - Right Sidebar issue fix' script is no longer necessary due to a forum fix Nov 22 2010\n\nUninstall this script manually via the GreaseMonkey 'Manage Scripts' interface");
// ORIGINAL CODE BELOW left commented-out for historical purposes

// //Detect sidebar
// var hasSidebar = document.evaluate("//div[@id='sidebar' and @class='sidebar_right']", document, null,9, null).singleNodeValue;

// //On pages that have a right-side sidebar, do nothing; on pages that don't, stretch page to full width
// if (hasSidebar) {
// 	// do nothing
// } else {
// 	// stretch content area by renaming the div
// 	GM_addStyle('.content_left {margin-right: 0px; !important}');
// }