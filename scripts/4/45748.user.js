// ==UserScript==
// @name           Google Inbox Count Display
// @namespace      http://po-ru.com/
// @description    Show unread message count at the start of the title to be more readable in tabs
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     if (matches = newval.match(/(.* - Inbox) (\(\d+\))/i)) {
        newval = matches[2] + ' ' + matches[1];
     }
     return (newval);
  });

