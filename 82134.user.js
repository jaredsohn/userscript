// ==UserScript==
// @name           4chan buzzkill
// @namespace      4chanbk
// @description    Kills stupid noise on 4chan so that one may troll in peace without muting.
// @include        http://*4chan.org/b/*
// ==/UserScript==

var embers = document.getElementsByTagName('embed');
for (i=0; i<embers.length; i++) {
  if (embers[i].src='http://swf.4chan.org/gma.swf') {
    embers[i].src='null';
  }
}