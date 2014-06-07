// ==UserScript==
// @id             twitterf5meansrefresh@phob.net
// @name           Twitter F5 Means Refresh
// @version        0.25
// @namespace      phob.net
// @author         wn
// @description    Reclaims the F5 key from Twitter, making it refresh the current page
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/152402.meta.js
// ==/UserScript==


var script = document.createElement("script");
script.setAttribute("type", "application/javascript");

script.textContent = "(" + function() {
  document.addEventListener("keydown", function(e) {
    if (e.which === 116) {
      e.preventDefault();
      // not using reload() since it seems to preserve page scroll position
      window.location.href = window.location.href;
    }
  }, false);
} + ")()";

document.body.appendChild(script);
document.body.removeChild(script);
