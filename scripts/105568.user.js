// ==UserScript==
// @name          TouchArcade Unredirector
// @description	  Remove redirects from all links on TouchArcade.
// @author        Vague Rant
// @homepage      http://vaguerant.tumblr.com/
// @include       http://*toucharcade.com/*
// ==/UserScript==

(function() {

  links = document.getElementsByTagName("a");
  for (i=0; i < links.length; i++) {
    var link = links[i];
    if (!link.innerHTML || !link.href || link.href.indexOf("http://toucharcade.com/link/") == -1) {
      // Skip if this link has no visible text, no href URL or the target isn't a redirect.
      continue;
    }
    var idx = link.href.indexOf("/link/");
    link.href = link.href.substr(idx + 6);
    // Chop off the redirect and it's done!
  }
 })();