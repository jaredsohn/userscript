// ==UserScript==
// @name          Chronological View for soleil-nov (2)
// @description	  Displays these Tumblr posts in chronological order
// @namespace     http://soleil-nov.tumblr.com
// @include       http://soleil-nov.tumblr.com/
// @include       http://soleil-nov.tumblr.com/page/*
// ==/UserScript==

var posts = document.getElementById("content").getElementsByClassName("post");
var numPosts = posts.length;
for (var i=numPosts - 1; i >= 0; i--) {
     document.getElementById("content").appendChild(posts[i]);
}
