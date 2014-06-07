// ==UserScript==
// @name          Extensions Mirror - Extensions
// @namespace     http://loucypher.cjb.net/
// @include       http://www.extensionsmirror.nl/index.php?*showforum=2
// @include       http://www.extensionsmirror.nl/index.php?*showforum=3
// @include       http://www.extensionsmirror.nl/index.php?*showforum=32
// @include       http://www.extensionsmirror.nl/index.php?*showforum=33
// @include       http://www.extensionsmirror.nl/index.php?act=SF&s=&f=2
// @include       http://www.extensionsmirror.nl/index.php?act=SF&s=&f=3
// @include       http://www.extensionsmirror.nl/index.php?act=SF&s=&f=32
// @include       http://www.extensionsmirror.nl/index.php?act=SF&s=&f=33
// @description	  Automatically sort topic by last post
// ==/UserScript==

(function() {
  location.href = location.href + '&st=&sort_key=last_post&sort_by=Z-A';
})();
