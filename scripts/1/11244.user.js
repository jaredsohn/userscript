// ==UserScript==
// @name           LJ Inbox: from Sidebar to Topbar
// @namespace      afuna.livejournal.com
// @description    Move the Message Center sidebar to the top
// @include        http://www.livejournal.com/inbox/*
// @exclude        http://www.livejournal.com/inbox/compose.bml*
// ==/UserScript==

var row =
document.evaluate( "//div[contains(@class,'inbox_newitems')]/following-sibling::table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.rows[0];

var refreshLink = document.getElementById('RefreshLink');

refreshLink.parentNode.insertBefore(
    document.getElementById('esn_folder_all').parentNode.parentNode,
    refreshLink);

var composeLink = document.createElement("a");	
composeLink.innerHTML = "New Message";
composeLink.setAttribute("href", "./compose.bml");
refreshLink.parentNode.appendChild(document.createTextNode(" | "));
refreshLink.parentNode.appendChild(composeLink);

row.deleteCell(1);
row.deleteCell(0);

GM_addStyle(
".folders a, .folders p, .esnlinks {display: inline !important;} \
.esnlinks {float: left !important;}\
.folders a {padding: 0px 5px !important; } \
td .folders {display: none !important;}");