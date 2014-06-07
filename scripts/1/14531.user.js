// ==UserScript==
// @name           You've Got Mefimail!
// @namespace      http://flatluigi.googlepages.com/scripts
// @description    A quick + dirty little script to alert you if you've got Mefimail.
// @include        http://*.metafilter.com/*
// @exclude        http://*.metafilter.com/*/messages.mefi*
// ==/UserScript==

(function() {
  if (document.body.innerHTML.indexOf("</strong> new</a>") > -1) {
		alert("You have new messages!");
  } 
})();