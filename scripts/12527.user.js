// ==UserScript==
// @name            livedoor Reader title unread count
// @namespace       http://greasemonkey.blog67.fc2.com/
// @description     The title is changed into unread count
// @include         http://reader.livedoor.com/reader/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     if (matches = newval.match(/\((\d+\+?)\)/)) {
        newval = "(" + matches[1] + ')';
     }
     return (newval);
  });