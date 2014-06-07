// ==UserScript==
// @id             twitter.com-c963bc7f-f6a1-4a5f-8c7b-755b0257f72a@scriptish
// @name           Hashtag Denied
// @version        1.0
// @namespace      
// @author         
// @description    Hide all tweets that contain a hashtag.
// @include        https://twitter.com/
// @run-at         document-end
// ==/UserScript==


runOnTweets(function (tweet) {
  if (tweet.querySelector(".twitter-hashtag")) {
      tweet.style.display = "none"
  }
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