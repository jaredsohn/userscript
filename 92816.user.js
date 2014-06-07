// ==UserScript==
// @id             runOnFeed
// @name           Run on Feed
// @description    Runs on news feed items any time!
// @include        *//www.facebook.com*
// @include        *//facebook.com*
// ==/UserScript==

// copy and paste this into your GM script

runOnFeeds(function(feed) {
  // put your code here, this will run on each news feed item
  feed.style.backgroundColor = "purple";
});

// runOnFeeds - http://userscripts.org/scripts/show/92816
// By: themiddleman - http://userscripts.org/users/56580
// Send this a function to run once on each news feed item as soon as it is loaded.
function runOnFeeds(callback) {
  var i, pvms;
  document.addEventListener("DOMNodeInserted", function (e) {
    if (e.target.className.indexOf("pvm ") !== -1) {
      callback(e.target);
    }
  }, true);
  
  pvms = document.getElementsByClassName("pvm");
  for (i = 0; i < pvms.length; i++) {
    callback(pvms[i]);
  }
}
