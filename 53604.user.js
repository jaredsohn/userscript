// ==UserScript==
// @name           Disable "mark all posts as read" link
// @namespace      http://www.ryanandbran.com
// @description    Removes the infamous link from your userarea, replacing it with a much more useful function.
// @include        http://www.ryanandbran.com/forum/*
// ==/UserScript==

poop = document.getElementById("markpostsread");
poop.innerHTML = '<a href="http://www.ryanandbran.com/forum/index.php?action=unreadreplies">Mark all posts as read.</a>';
poop.insertBefore(poop);