// ==UserScript==
// @name           Gmail title unread count
// @namespace      http://mathiasb.dyndns.org/Gmail+unread+title
// @description    Moves unread count in front of title. Good for tabs so it doesn't get cut off.
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*

// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     var endval;
     if (matches = newval.match(/Gmail - Inbox \((\d+\+?)\)/)) {
        endval = newval;
	endval = endval.split("-")[2]
        newval = "(" + matches[1] + ') Gmail - Inbox - ' + endval;
     }
     return (newval);
  });
