// ==UserScript==
// @name           Finya Logout Unreminder
// @namespace      http://www.martinmunich.com
// @include        http://*.finya.de/*
// @description    Remove logout reminder
// @version        0.0.3
// @downloadURL    http://userscripts.org/scripts/source/288434.user.js
// @updateURL      http://userscripts.org/scripts/source/288434.user.js
// ==/UserScript==

if (reminderHeading = document.evaluate( "//h1[contains(@style,'background-image:url(/img/nav_logout.png);')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)) {
    reminderDiv = reminderHeading.snapshotItem(0).parentNode;
    reminderDiv.parentNode.removeChild(reminderDiv);
}
