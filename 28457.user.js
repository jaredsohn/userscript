// ==UserScript==
// @name           GameFAQs User Highlight
// @author         Nick Presta
// @description    Highlight Topics and Users based on their Username
// @include        http://www.gamefaqs.com/*
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

// USE:
// To use this, just fill out the users list
// in the form:
// 'userName': 'color',
// comma is important
// k
(function () {

// Maybe group user groups to keep your life easier?
// You can remove these values, obviously
users = { 
          'HWC 101': '#CCFFFF',
          'foo': 'red',
          'bar': 'pink',
        }

// DO NOT EDIT BELOW THIS LINE!

// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='topics']/tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) ) {
      // This below should work, but doesn't for default stylesheet. 
      // However, this could work for custom stylesheets which are written crappy/specifically.
      item.parentNode.parentNode.style.backgroundColor = bgColor;
      // Proceed to ugly hack
      // This is where the script applies the background style to each TD element.
      for each( var children in item.parentNode.parentNode.childNodes ) {
        if ( children.nodeType == 1 )
          children.style.backgroundColor = users[userKey];
      }
    }
  }
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='message']/tr/td[1]/a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) )
      item.parentNode.parentNode.style.backgroundColor = users[userKey];
  }
}

})();
