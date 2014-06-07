// ==UserScript==
// @name           GameFAQs Blacklist Topics
// @author         Nick Presta
// @description    Blacklists topics based on keywords or creators
// @include        http://www.gamefaqs.com/*
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

// USE:
// To use this, just fill out the words property (list).
// "t" corresponds to titles
// "u" corresponds to users
// Everything happens automagically

(function () {

words = {
  "t": [ "metrod" ],
  "u": [ "CJayC" ],
  "id": [ ]
}

// DO NOT EDIT BELOW THIS LINE!

// Check for replacements in topic name
var selectedTopicsTitle =
document.evaluate("//table[@class='topics']/tbody/tr[not(@class='head')]/td[2]/a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsTitle.snapshotLength; ++i ) {
  for each( var titleMatch in words['t'] ) {
    if ( selectedTopicsTitle.snapshotItem(i).nodeValue.match( new RegExp("\\b" + titleMatch + "\\b", "i") ) )
      selectedTopicsTitle.snapshotItem(i).parentNode.parentNode.parentNode.style.display = "none";
  }
}

// Check for replacements in username
var selectedTopicsUser =
document.evaluate("//table[@class='topics']/tbody/tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  for each( var userMatch in words['u'] ) {
    if ( selectedTopicsUser.snapshotItem(i).nodeValue.match( new RegExp("\\b" + userMatch + "\\b", "i") ) )
      selectedTopicsUser.snapshotItem(i).parentNode.parentNode.style.display = "none";
  }
}

// Check for replacements in topic id
var selectedTopicId =
document.evaluate("//table[@class='topics']/tbody/tr[not(@class='head')]/td[2]/a", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicId.snapshotLength; ++i ) {
  for each( var idMatch in words['id'] ) {
    if ( selectedTopicId.snapshotItem(i).getAttribute("href").match( new RegExp("(.*)topic=" + idMatch, "i") ) )
      selectedTopicId.snapshotItem(i).parentNode.parentNode.style.display = "none";
  }
}

})();
