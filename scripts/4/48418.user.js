// ==UserScript==
// @name           Gamefaqs Qwat Rename
// @description    Changes everyone's name to Qwat. Based on warutrid's Gamefaqs Anon Rename script.
// @include        http://www.gamefaqs.com/*
// @include        http://boards.gamefaqs.com/gfaqs/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

(function () {

// DO NOT EDIT BELOW THIS LINE!

// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='board topics']//tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
	item.nodeValue = 'Qwat';
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
      item.nodeValue = 'Qwat';
}

})();

