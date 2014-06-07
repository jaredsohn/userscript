// ==UserScript==
// @name          TEM: Sort extension forums
// @namespace     http://mozilla.wikicities.com/
// @include       http://www.extensionsmirror.nl/index.php?*showforum=2
// @include       http://www.extensionsmirror.nl/index.php?*showforum=3
// @include       http://www.extensionsmirror.nl/index.php?*showforum=32
// @include       http://www.extensionsmirror.nl/index.php?*showforum=33
// @include       http://www.extensionsmirror.nl/index.php?act=SF*&f=2
// @include       http://www.extensionsmirror.nl/index.php?act=SF*&f=3
// @include       http://www.extensionsmirror.nl/index.php?act=SF*&f=32
// @include       http://www.extensionsmirror.nl/index.php?act=SF*&f=33
// @exclude       http://www.extensionsmirror.nl/lofiversion/*
// @description	  Automatically sort topic by last post
// ==/UserScript==
// Changelog:
// - 20050915: Fixed for bug#307983

window.setTimeout(function() {
  location.replace(location + '&st=&sort_key=last_post&sort_by=Z-A');
});

