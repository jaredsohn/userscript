// ==UserScript==
// @name           American Express UI Fixer
// @author         StealthMonkey
// @namespace      http://www.stealthmonkey.com
// @description    Fixes issues with the American Express user interface
// @homepage       https://userscripts.org/scripts/show/125982
// @updateURL      https://userscripts.org/scripts/source/125982.meta.js
// @downloadURL    https://userscripts.org/scripts/source/125982.user.js
// @include        https://online.americanexpress.com/*
// @version        1.4
// ==/UserScript==

// Version 1.4:
//  - Hid large note about pending transactions
//
// Version 1.3:
//  - Updated script based on American Express changes
//  - Made tags stand out more
//
// Version 1.2:
//  - Futher reduced padding around transaction items
//  - Reduced padding around items in the pending transation list
//  - Reduced padding at top of transation list
//
// Version 1.1:
//  - Reduced padding around tag items when tagging a transation
//
// Version 1.0:
//  - Initial release

// Reduce Padding of Transaction Items
GM_addStyle("#listData TD, #pendingListData TD { padding-top: 3px !important; padding-bottom: 3px !important; }");

// Reduce Padding of Tag Items
GM_addStyle("li.tagItem { height: inherit; }");

// Make Tags Stand Out
GM_addStyle(".tagText { font-weight: bold !important; color: #008800 !important; }");

// Hide large note about pending transactions
GM_addStyle("#pendinghelp-tbody { display: none; }");
