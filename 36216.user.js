// ==UserScript==
// @name          LJ Twitterless modified
// @namespace     http://twilite.org/~xtina/scripts/
// @description   This removes the bullet list from LoudTwitter posts. Edited test version.
// @include       http://*.livejournal.com/friends
// @include       http://*.livejournal.com/friends/*
// ==/UserScript==

// This is 100% straight from this script:
// http://www.gozer.org/mozilla/greasemonkey/scripts/adblockfilter.user.js
// Bless you, whoever you are.

// NOTE: This is just an edit of the original script here http://userscripts.org/scripts/show/17139, for journals that don't use the Expressive/Mixit styles. It won't remove the actual posts but just removes the entry content. All edits were done to Xtina's specifications, so credit goes to her. I know bugger-all about this stuff, unfortunately.

(function() {

var elm, thing, regex, uls;

elm = [ 'ul' ];
thing = [ 'class' ];

regex = new RegExp("loudtwitter", "gi");

for(var x = 0; x < elm.length; x++) {
  uls = document.getElementsByTagName(elm[x]);

  for(var y = 0; y < uls.length; y++) {
    if(!uls[y] || !uls[y].hasAttributes())
      continue;

    for(var z = 0; z < thing.length; z++)
      if(uls[y].hasAttribute(thing[z]))
        if(uls[y].getAttribute(thing[z]).match(regex))
          uls[y].parentNode.parentNode.removeChild(uls[y].parentNode);
    }
  }
})();