// ==UserScript==
// @name           TDBank User Name UN-Masker
// @namespace      http://www.mcarterbrown.com/carter/greasemonkey/tdbanktext.user.js
// @description    Turns the TDBank User Name login field back to a text type so you can view your username
// @include        https://onlinebanking.tdbank.com/*
// ==/UserScript==

var userField = document.evaluate("//input[@name='user']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var fieldFix = userField.snapshotItem(0);
fieldFix.type = 'text';