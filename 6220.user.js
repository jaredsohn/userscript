// ==UserScript==
// @name			Google Reader title unread count
// @namespace     	http://mathiasb.dyndns.org/Google+unread+title
// @description   	Moves unread count in title in front of "Google Reader" (more useful in tabs)
// @include       	http://www.google.com/reader/*
// @include		  	https://www.google.com/reader/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     if (matches = newval.match(/Google Reader \((\d+\+?)\)/)) {
        newval = "(" + matches[1] + ') Google Reader';
     }
     return (newval);
  });
