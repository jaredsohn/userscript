// ==UserScript==
// @name           Metafilter Control-Enter
// @namespace      http://schmod.com/
// @description    Lets you submit Metafilter comments by pressing Enter.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

$('textarea#comment').keydown(function (e) {

  if (e.ctrlKey && e.keyCode == 13) {
    $("#postButton").click();
  }
});