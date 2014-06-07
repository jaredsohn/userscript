// ==UserScript==
// @name           SHW forum links redirection replace
// @namespace      http://userscripts.org/users/104413
// @description    Removes prefix from SHW forum links
// @include        http://*svethardware.cz/forum/*
// ==/UserScript==

(function() {
    for (var i = 0; i < document.links.length; i++) 
    {
      var ln = document.links[i];
      ln.href = ln.href.replace("www\.svethardware\.cz/forum/externalredirect\.php?url=http://", "");
      ln.href = ln.href.replace("www\.svethardware\.cz/forum/externalredirect\.php?url=https://", "");
    }
})();