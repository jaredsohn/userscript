// ==UserScript==
// @name           TDBank Identity Verification Autocomplete Disable
// @namespace      http://www.cowbird.org/js/userscripts/td.disable_autocomplete.js
// @description    Disables the use of auto-complete on TDBank's Identity Verification page. This script shouldn't have to exist, but is necessary. Please forgive the awkward description.
// @include        https://onlinebanking.tdbank.com/*
// ==/UserScript==

var guiltyCulprit = document.evaluate("//form[ @id = 'form1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var fieldFix = guiltyCulprit.snapshotItem(0);
fieldFix.autocomplete = 'off';