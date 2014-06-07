// ==UserScript==
// @name           GameFAQs Ignore Users
// @author         Nick Presta
// @description    Ignore topics and messages from users based on their Username
// @include        http://www.gamefaqs.com/*
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

// USE:
// To use this, just fill out the users list
// like this:
// users = [ 'user1', 'user2', 'user3' ]
(function () {

users = [ 'testuser' ];

// DO NOT EDIT BELOW THIS LINE!

// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='topics']/tbody/tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
  for each ( var userName in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userName + "\\b", "i") ) ) {
      // This below should work, but doesn't. Proceed to ugly hack
      // item.parentNode.parentNode.style.display = 'none';
      // God damnit. The background color isn't overwriting the fucking stylesheet value.
      // This is ugly as fuck but should work:
      // This is where the script applies the background style to each TD element.
      for each( var children in item.parentNode.parentNode.childNodes ) {
        if ( children.nodeType == 1 )
          children.style.display = 'none';
      }
    }
  }
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='message']/tbody/tr/td[1]/a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
  for each ( var userName in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userName + "\\b", "i") ) ) {
      item.parentNode.parentNode.parentNode.style.display = 'none';
      item.parentNode.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
    }
  }
}

})();
