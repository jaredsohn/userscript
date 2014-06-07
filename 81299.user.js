// ==UserScript==
// @name           Massively Comment Filter
// @namespace      ZerothAngel
// @description    Ignores comments by annoying users on Massively.com
// @include        http://www.massively.com/*
// ==/UserScript==

// Add usernames here. Case-insenstive.
var ignoreList = ["Kdolo", "CCon99"];

var ignoreRE = new RegExp("\\b(" + ignoreList.join("|") + ")\\b", "i");

var authornames = document.getElementsByClassName("authorname");
for (var i = 0, il = authornames.length; i < il; i++) {
  var authorname = authornames[i];
  // Get author link
  var aNode = authorname.getElementsByTagName("a")[0];
  if (ignoreRE.test(aNode.innerHTML)) {
    // Match, kill it
    aNode.style.textDecoration = "line-through";
    // Remove contents, except for credits
    var comment_inner = authorname.parentNode.parentNode;
    while (comment_inner.firstChild != comment_inner.lastChild)
      comment_inner.removeChild(comment_inner.lastChild);
    // Remove avatar
    var avatarLink = comment_inner.parentNode.getElementsByClassName("avatar")[0].parentNode;
    avatarLink.parentNode.removeChild(avatarLink);
  }
 }
