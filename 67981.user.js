// ==UserScript==
// @name            No, Really, Shut Up
// @namespace       http://www.gibberish.com/
// @description     Hides comments on most sites. Attempts to show comments when they are specifically linked to.
// @include         http://*
// @include         https://*
// ==/UserScript==

var linkedToComment = location.hash.indexOf("comment") != -1 ||
					  /comments[\.|\/]{1}/i.test(location.pathname);

if (!linkedToComment) {
  var ids = ["comments","Comments","commentform","respond","commentlist","commentslist",
			 "watch-comment-panel","watch-comments-core","cm","disqus_thread",
			 "pluckcomments","pluck","shoutboxContainer","latest-comments",
			 "all-comments","all_comments","blog_comments"];
  var classes = ["comment","comments","commentlist","commentslist"];
  //leaving Reddit alone for now
  
  for (var r in ids) {
	var isit = document.getElementById(ids[r]);
	if (isit && isit.tagName.toLowerCase() != "a") isit.style.display = "none";
  }

  for (var p in classes) {
	var still = document.getElementsByClassName(classes[p]);
	if (still.length) {
	  for (var t in still) {
		if (still[t].tagName.toLowerCase() != "a")
		  still[t].style.display = "none";
	  }
	}
  }
}