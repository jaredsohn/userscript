// ==UserScript==
// @name          GameFAQs unredirect
// @namespace     http://joemck.cjb.net/
// @description	  Undoes GameFAQs' dw.com.com redirector
// @include       http://www.gamefaqs.com/*
// ==/UserScript==

// Whenever you view a file hosted at GameFAQs, your request is routed through
// dw.com.com as a redirector.  This is probably some sort of stats/counter tool.
// While I do see that they want these stats, dw.com.com has been refusing my
// connections a lot lately, and the only way to view the file is to manually
// extract the URL from the redirector.  That's what this does.
// (semi-legible comments written at 2:30 AM)

(function() {

  links = document.getElementsByTagName("a");
  for (i=0; i < links.length; i++) {
    var link = links[i];
    if (!link.innerHTML || !link.href || link.href.indexOf("http://dw.com.com/redir") == -1) {
      // skip if this link has no visible text, no href URL or the target isn't a DW redirect
      continue;
    }
    var idx = link.href.indexOf("destURL=");
    if (idx < 0) {
      // skip if destURL param isn't in URL, this should NEVER occur, though
      continue;
    }
    link.href = unescape(link.href.substr(idx + 8));
    // Chop off the redirect, unescape and it's done!
    // Fortunately they use plain old JS escape codes for whacky characters
  }
 })();