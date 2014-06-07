// ==UserScript==
// @name           CryptIt Antiframe
// @namespace      userscripts.org
// @description    Blockiert Frames
// @include        http://crypt-it.com/*
// ==/UserScript==

if (top != top.frames[0]) {
  var vormals = top.frames[0].URL;
  top.location = top.frames[0].location;
}
