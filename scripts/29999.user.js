//
// This script removes chat box from the tailedfox site
//
// ==UserScript==
// @name          Remove Chat
// @namespace     http://www.septosoft.com/userscript/removechat
// @description   this removes the chat box of the tailedfox site
// @include       http://www.tailedfox.com/*
// ==/UserScript==

var allEmb, thisEmb;
allEmb = document.evaluate(
    '//embed[@src="http://shippuden51-52.chatango.com/group"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if(allEmb.snapshotLength > 0) {
    thisEmb = allEmb.snapshotItem(0);
    thisEmb.parentNode.removeChild(thisEmb);
}


