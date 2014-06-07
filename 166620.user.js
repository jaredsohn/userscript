// ==UserScript==
// @name        DDO forum fixup
// @namespace   http://anduin.net/~knan
// @description DDO - fixup missing redirects from old to new forum
// @grant       none
// @include     https://*.google.com/search?*
// @include     http://*.google.com/search?*
// @include     https://www.ddo.com/forums/*
// @include     http://ddowiki.com/*
// @version     6
// ==/UserScript==

(function() {
    for (var i = 0; i < document.links.length; i++) 
    {
      var ln = document.links[i];
      ln.href = ln.href.replace("http://forums\.ddo\.com/showthread\.php?t=", "https://www.ddo.com/forums/showthread.php/");
      ln.href = ln.href.replace("https://forums\.ddo\.com/showthread\.php?t=", "https://www.ddo.com/forums/showthread.php/");
      ln.href = ln.href.replace("http://forums\.ddo\.com/showthread\.php?p=", "https://www.ddo.com/forums/showthread.php/?p=");
      ln.href = ln.href.replace("https://forums\.ddo\.com/showthread\.php?p=", "https://www.ddo.com/forums/showthread.php/?p=");
      ln.href = ln.href.replace("http://forums\.ddo\.com/showpost\.php?p=", "https://www.ddo.com/forums/showthread.php/?p=");
      ln.href = ln.href.replace("https://forums\.ddo\.com/showpost\.php?p=", "https://www.ddo.com/forums/showthread.php/?p=");
    }
})();