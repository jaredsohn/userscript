// ==UserScript==
// @name           GTFO Twitter Promotions
// @namespace      GTFOTP
// @description    Removes Twitter's little promotion box
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
function gtfo()
{
  var entries = document.getElementsByClassName('promotion');
  for (entry in entries)
  {
    var e = entries[entry];
    if (e.style)
      e.style.display = 'none';
  }
}
gtfo();
