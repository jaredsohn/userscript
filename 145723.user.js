// ==UserScript==
// @name        wtf_nsfw
// @namespace   https://github.com/kvonhorn/wtf_nsfw
// @description Hides articles posted to r/WTF containing an NSFW or NSFL warning
// @downloadURL https://github.com/kvonhorn/wtf_nsfw/raw/master/wtf_nsfw.user.js
// @include     http://www.reddit.com/
// @include     http://www.reddit.com/r/WTF/
// @grant       none
// @version     20120913
// ==/UserScript==

// Returns true if given text (or current URL by default) matches r/WTF
var inWTF = function(text) {
  if('undefined'===typeof(text)) text = document.URL;
  return /r\/WTF/.test(text, "i");
};

var getPosts = function() {
  return document.querySelectorAll("#siteTable div.thing");
};

var getWTFPosts = function() {
  var allPosts = getPosts();
  var wtfPosts = null;
  if(inWTF()) {
    wtfPosts = allPosts;
  } else {
    wtfPosts = [];
    for(i = 0; i < allPosts.length; i++) {
      post = allPosts[i];
      urlSubreddit = post.querySelector("a.subreddit").href;
      if(inWTF(urlSubreddit)) wtfPosts.push(post);
    }
  }
  return wtfPosts;
};

var getTitle = function(post) {
  return post.querySelector("p.title").textContent;
};

var isNSFW = function(post) {
  var title = getTitle(post);
  return /NSF[WL]/.test(title, "i") || post.querySelector("li.nsfw-stamp");
};

var getNSFWPosts = function(posts) {
  if('undefined'===typeof(posts)) posts = getWTFPosts();
  var nsfwPosts = [];
  for(i = 0; i < posts.length; i++) {
    post = posts[i];
    if(isNSFW(post)) nsfwPosts.push(post);
  }
  return nsfwPosts;
};

var removePostsFromDocument = function(posts) {
  for(i = 0; i < posts.length; i++) {
    post = posts[i];
    console.log("Removing post " + getTitle(post));
    parentNode = post.parentNode;
    parentNode.removeChild(post);
  }
};

var nsfwPosts = getNSFWPosts();
console.log("Removing " + nsfwPosts.length + " WTF NSFW/NSFL posts from " + document.URL);
removePostsFromDocument(nsfwPosts);
