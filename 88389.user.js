// ==UserScript==
// @name           FT Unsubscribe Confirmation
// @namespace      http://userscripts.org/users/236669
// @description    Require confirmation before unsubscribing from a Flyertalk Forum/Thread
// @include        http://www.flyertalk.com/forum/*
// @include        http://flyertalk.com/forum/*
// ==/UserScript==
for (var i = document.links.length - 1; i >= 0; i--) {
  var link = document.links[i];
  if (link.href && link.href.match(/.*removesubscription.*/i)) {
    link.addEventListener('click', function(event) {
      if (!window.confirm('Hit OK if you really want to unsubscribe')) {
        event.stopPropagation();
        event.preventDefault();
      }
    }, true);
  }
}
