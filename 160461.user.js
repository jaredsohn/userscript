// ==UserScript==
// @name        Facebook Sponsored Posts Cleaner
// @description Automatically Hides Sponsored Posts (Ads) in Facebook Stream
// @namespace   http://facebook.example.org
// @author      Shao-Chung Chen
// @license     MIT (http://opensource.org/licenses/MIT)
// @version     1.3
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
//
// @history     1.3 make use of MutationObserver to deal with AJAX-loaded posts
// @history     1.2 change the stream story selector to cover all story types
// @history     1.1 change to native DOM APIs because Chrome ignores @require
// @history     1.0 initial commmit
// ==/UserScript==

window.cleanSponsoredPosts = function() {
  console.log("go go power cleaners");
  var stories = document.getElementsByClassName("genericStreamStory");
  for (var i = 0; i < stories.length; i++) {
    var story = stories[i];
    var additionalLogging = story.getElementsByClassName("uiStreamAdditionalLogging")[0];
    if (additionalLogging) {
      var adLink = additionalLogging.getElementsByTagName("a")[0];
      if (adLink.href.indexOf("ads") != -1) {
        story.style.display = "none";
        console.log("back off you ads~");
      }
    }
  }
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var target = document.getElementsByTagName("body")[0];
var config = { attributes: true, childList: true, characterData: true };

var mutationObserver = new MutationObserver(function(mutations) {
  cleanSponsoredPosts();
  console.log("it's mutated! this is sparta")
});

mutationObserver.observe(target, config);
cleanSponsoredPosts();