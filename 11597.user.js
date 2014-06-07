// ==UserScript==
// @name          Addonsmirror-Extensions/Sort topic by last post
// @namespace     
// @include       http://forum.addonsmirror.net/index.php?*showforum=2
// @include       http://forum.addonsmirror.net/index.php?*showforum=3
// @include       http://forum.addonsmirror.net/index.php?*showforum=32
// @include       http://forum.addonsmirror.net/index.php?*showforum=33
// @include       http://forum.addonsmirror.net/index.php?act=SF&s=&f=2
// @include       http://forum.addonsmirror.net/index.php?act=SF&s=&f=3
// @include       http://forum.addonsmirror.net/index.php?act=SF&s=&f=32
// @include       http://forum.addonsmirror.net/index.php?act=SF&s=&f=33
// @description	  Automatically sort topic by last post
// ==/UserScript==

(function() {
  location.href = location.href + '&st=&sort_key=last_post&sort_by=Z-A';
})();

