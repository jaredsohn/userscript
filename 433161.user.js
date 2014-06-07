// ==UserScript==
// @name        Wow, cows
// @namespace   Bassintag
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

(function () {
  for(var els = document.getElementsByTagName ('img'), i = els.length; i--;)
    els[i]['src'] = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7gkxlF1MgUkjUjW1rVUqWF3Ay49wdC5CGrSdFeqd9vAg_8Bep9Q';
}) ();