// ==UserScript==
// @name           Move the FriendFeed sidebar to the other side of the page
// @namespace      http://userscripts.org/users/15179
// @description    Moves the FriendFeed sidebar to the other side of the page
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// ==/UserScript==

(function () {
  var s = document.getElementById("sidebar");
  if (!s) return;
  var p = s.parentNode;
  p.removeChild(s);
  p.appendChild(s);
})();