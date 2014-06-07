// ==UserScript==
// @name           Gimme link to my Tumblr blog
// @namespace      www.tumblr.com
// @include        http://www.tumblr.com/share_confirmation
// ==/UserScript==


e = document.getElementById('content');
newElement = document.createElement("p");
newElement.innerHTML = "<a href=\"http://amagard.tumblr.com/\">My Tumblr Blog</a>";
e.parentNode.insertBefore(newElement, e.nextSibling);
console.dir(newElement);

