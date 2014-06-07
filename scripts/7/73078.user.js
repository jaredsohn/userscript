// ==UserScript==
// @name          Heritage Keyboard Disabler
// @namespace     https://online.hbs.net.au/heritage_keyboard_disable.user.js
// @description   Disable the silly password keyboard from the Heritage website
// @include       https://online.hbs.net.au/*
// @exclude       
// ==/UserScript==

var userField = document.evaluate("//input[@name='PWD']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var fieldFix = userField.snapshotItem(0);
fieldFix.className='nokp';
