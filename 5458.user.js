// ==UserScript==
// @name           Google Inbox Count Display v2
// @namespace      http://dandavis.com/greasemonkey/
// @description    Modify Gmail inbox title to display count of unread messages at the beginning, updated to support domains
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     if (matches = newval.match(/(.*) - Inbox \((\d+)\)/)) {
        newval = '(' + matches[2] + ') - ' + matches[1] + ' - Inbox';
     }
     return (newval);
  });

