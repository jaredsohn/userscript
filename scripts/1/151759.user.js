// ==UserScript==
// @name           Facebook New Tab
// @creator        ṀὧṂ Fans
// @description    Open all facebook app feeds / links at new tab
// @icon           http://lockupmwm.webs.com/gambor/mwmsmall1.png
// @include        https://www.facebook.com/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://apps.facebook.com/inthemafia/track.php?*
// @exclude        https://fbcdn-profile-a.akamaihd.net/*
// @exclude        https://fbexternal-a.akamaihd.net/*
// @exclude        https://s-platform.ak.fbcdn.net/*
// @version        Balqis Comey.〤

// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].target = "_blank";
}