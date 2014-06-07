// ==UserScript==
// @name           Massively No Comments
// @namespace      ZerothAngel
// @description    Removes comment section entirely from Massively.com
// @include        http://www.massively.com/*
// ==/UserScript==

// Remove comments themselves
var commentsDiv = document.getElementById("comments");
if (commentsDiv) {
  commentsDiv.parentNode.removeChild(commentsDiv);
 }

// Remove the "add comment" header...
var addcommentsDiv = document.getElementById("addcomments");
if (addcommentsDiv) {
  addcommentsDiv.parentNode.removeChild(addcommentsDiv);
 }

// ...and its form
var commentform = document.getElementById("commentform");
if (commentform) {
  commentform.parentNode.removeChild(commentform);
 }

// Remove the comment counts/links. Also works on main page.
var postmetaNodes = document.getElementsByClassName("postmeta");
for (var i = 0, il = postmetaNodes.length; i < il; i++) {
  var commentsNodes = postmetaNodes[i].getElementsByClassName("comments");
  for (var j = 0, jl = commentsNodes.length; j < jl; j++) {
    var commentsNode = commentsNodes[j];
    if (commentsNode) {
      if (commentsNode.tagName == "LI") {
	commentsNode.parentNode.removeChild(commentsNode);
      }
    }
  }
 }
