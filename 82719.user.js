// ==UserScript==
// @name           runOnTweets
// @namespace      http://userscripts.org/users/56580
// @include        http://twitter.com*
// @include        https://twitter.com*
// ==/UserScript==


// copy and paste this into your GM script

runOnTweets(function (tweet) {
  // put your code here, this will run on each tweet
  tweet.style.background = "purple"
})

// runOnTweets v3 - http://userscripts.org/scripts/show/82719
// By: themiddleman - @rob__ot
// Send this a function to run once on each tweet as soon as it is loaded.
function runOnTweets (callback) {
  // Listen for dynamically loaded tweet nodes
  document.addEventListener("DOMNodeInserted", function (e) {
    if (~e.target.className.indexOf("stream-item")) {
      callback(e.target)
    }
  }, true)

  // Tweets on load
  var statuses = document.getElementsByClassName("stream-item")
  statusesLength = statuses.length
  for (var i = 0; i < statusesLength; i++) {
    callback(statuses[i])
  }
}
