// ==UserScript==
// @name          spamgourmet to secure
// @namespace     http://spig.net/
// @description   Redirect to https when visiting non-ssl Spamgourmet
// @include       http://www.spamgourmet.com/*
// @include       http://spamgourmet.com/*
// @date          2008-05-13
// @version       0.3.1
// @GM_version    0.5.4
// ==/UserScript==

(function() {
    if (window.location.href.search(/http:\/\/(www\.)?spamgourmet/i)>=0) {
      var oldURL = window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
      var secureURL = "https://" + oldURL;
      window.location.href = secureURL;
    }
})();
