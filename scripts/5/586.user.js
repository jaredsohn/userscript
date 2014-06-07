// ==UserScript==
// @name          Always link to full LiveJournal userinfo
// @namespace     http://bje.nu/mozilla-greasemonkey.shtml
// @description   Modify links to LJ user info to always point to full LJ userinfo.
// @include       http://*.livejournal.com/*
// ==/UserScript==

(function(){
  var userinfoRegEx = /^(?:http:\/\/www\.livejournal\.com)?\/userinfo.bml\?user=([^&]+)/i;
  var userOwnDomainLink = /^http:\/\/([^\.]+)\.livejournal\.com\/info/i;
  var userOwnPageLink = /^(?:http:\/\/www\.livejournal\.com)?\/(?:users|community)\/([^\/]+)\/info/i;
  var l = document.getElementsByTagName("a");
  for (var cand = null, i = 0; (cand = l[i]); i++) {
    uim = userinfoRegEx.exec(cand.getAttribute('href'));
    if (uim == null) {
      uim = userOwnDomainLink.exec(cand.getAttribute('href'));
    }
    if (uim == null) {
      uim = userOwnPageLink.exec(cand.getAttribute('href'));
    }
    if (uim != null) {
      cand.setAttribute('href','http://www.livejournal.com/userinfo.bml?user=' + uim[1] + '&mode=full');
    }
  }
})();