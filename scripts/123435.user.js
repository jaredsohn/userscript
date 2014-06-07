// ==UserScript==
// @name          FB Rage
// @namespace     http://www.digitalrefinery.org
// @description   Uses facebook pages for rage!
// @include       *

// ==/UserScript==
//
// --------------------------------------------------------------------
//



(function () {

// Replacement Arrays
//
// To add more words, just follow this example:
// To filter words in a topic title, put it under the t property in the words object. For messages, the 'm' property.
// If you want to filter a word in both, add it to both.
//
// "word to match": "word to replace with"
//
// Feel free to add/edit/remove all words to whatever you like.

words = {
  "t": { "Hacked": "great board!" },
  "m": {
          "post": "pstttt",
          "xbox": "ugly console", 
          "gamecube": "kiddy console",
          "ps2": "crap console",
          "ce": "fast-moving board"
  }
}

// DO NOT EDIT BELOW THIS LINE!

// Select MESSAGES only
var selectedMessages =
document.evaluate("//table[@class='message']", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessages.snapshotLength; ++i ) {
  for ( messageWord in words['m'] ) {
    selectedMessages.snapshotItem(i).innerHTML = 
    selectedMessages.snapshotItem(i).innerHTML.replace(
                                                      new RegExp("\\b" + messageWord + "\\b", "gi"),
                                                      words['m'][messageWord]
                                                      );
  }
}

// Check for replacements
var selectedTopics =
document.evaluate("//table[@class='topics']", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopics.snapshotLength; ++i ) {
  for ( topicWord in words['t'] ) {
    selectedTopics.snapshotItem(i).innerHTML = 
    selectedTopics.snapshotItem(i).innerHTML.replace(
                                                      new RegExp("\\b" + topicWord + "\\b", "gi"),
                                                      words['t'][topicWord]
                                                      );
  }
}

})();