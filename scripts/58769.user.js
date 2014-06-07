// ==UserScript==
// @name           TDBank User Name Masker
// @namespace      http://www.cowbird.org/js/userscripts/td.user.js
// @description    Turns the TDBank User Name login field back to a password type so the username isn't revealed
// @include        https://onlinebanking.tdbank.com/*
// ==/UserScript==

var userField = document.evaluate("//input[@name='user']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var fieldFix = userField.snapshotItem(0);
fieldFix.type = 'password';