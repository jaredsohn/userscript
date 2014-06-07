// ==UserScript==
// @name           Twitter: External Links to New Window
// @namespace      com.gingerbeardman.twitterexternallinks
// @description    Any non-Twitter.com links open in a new window
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @run-at         document-end
// @author         Matt Sephton
// @version        1.0.0
// ==/UserScript==

var as = document.getElementsByTagName("a")
  , RE_isESR = /^https?:\/\/(?:[a-zA-Z]+\.)?twitter\.com(?:\/|$)/i;

for (var i = 0, e = as.length, m = document.createElement("a"); i < e; ++i) {
  var t = as[i].getAttribute("target")
    , h = as[i].getAttribute("href");

  // Ignore if the target attribute is already set or we have no href (for some reason).
  if (t || !h) {
    continue;
  }

  // See http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
  m.href = h;
  h = m.href;
  m.href = null;

  // Set the target if this isn't for an ESR URL.
  if (!RE_isESR.test(h)) {
    as[i].setAttribute("target", "_blank");
  }
}