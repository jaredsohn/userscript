// Mailman Discard Message and Sender
// version 0.1
// 2008-06-28
// Copyright (c) 2008, Nick Ali
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// Based off Paul Smith's Mailman Discard Default 
// which is at http://userscripts.org/scripts/show/732
// --------------------------------------------------------------------
// ==UserScript==
// @name        Mailman Discard Message and Sender
// @namespace   http://boredandblogging.com/greasemonkey/
// @description Set message to discard and discard from sender
// @include     https://*/mailman/admindb/*
// ==/UserScript==

var discards;

discards = document.evaluate(
    "//input[@value='3' and @type='radio' and starts-with(@name,'senderaction')]| //input[@value='1' and @type='checkbox' and starts-with(@name,'senderfilter')]", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

for (var i = 0; i < discards.snapshotLength; i++) {
    var thisDiscard = discards.snapshotItem(i);
    thisDiscard.checked = 'checked';
}
